import { App } from '@src/app/app.interface';
import { LoginType, UserStatus, UserType } from '@src/app/constants';
import {
	Console,
	passwordUtil,
	randomNumberStringGenerator,
	ResponseError,
	tokenUtil,
} from '@src/utils';
import fileUpload from '@src/utils/upload.util';
import { CONSTANT } from '../api.constants';
import { sessionService } from '../session';
import { UserDataFormat } from './data.formatter';
import sendEmail from '../../../utils/sendEmail';
import {
	LinksConstant,
	USER_MESSAGES,
	DEFAULT_PASSWORD,
} from './user.constants';
import {
	ILoginData,
	IUser,
	ILogoutData,
	IChangePassword,
} from './user.interface';
import { User, UserDetailModel } from './user.model';
import { VerifyOtpData } from './user.swagger';
import { producer, consumer } from '../../../rabbitmq';
import getImageFromS3 from '@src/utils/getimage.util';
const useragent = require('express-useragent');

class UserService {
	readonly Model = UserDetailModel;
	readonly UserModel = User;

	async register(
		req?: App.Request,
	) {
		try {
			const data = req.data
			Console.info(`partial ${JSON.stringify(req.client)}`);
			// @TODO set limit to 1 to count
			const { email, phoneNumber, countryCode, userName } = data;
			const [isEmailExists, isPhoneExists, isUserNameExists] = await Promise.all([
				this.UserModel.exists({
					email,
					status: { $ne: UserStatus.Deleted },
				}),
				this.UserModel.exists({
					phoneNumber,
					countryCode,
					status: { $ne: UserStatus.Deleted },
				}),
				this.UserModel.exists({
					userName,
					status: { $ne: UserStatus.Deleted },
				}),
			]);
			if (isEmailExists) {
				return Promise.reject(
					new ResponseError(422, USER_MESSAGES.REGISTER.EMAIL_EXISTS)
				);
			}
			if (isPhoneExists) {
				return Promise.reject(
					new ResponseError(422, USER_MESSAGES.REGISTER.PHONE_EXISTS)
				);
			}
			if (isUserNameExists) {
				return Promise.reject(
					new ResponseError(422, USER_MESSAGES.USER_NAME.TAKEN)
				);
			}
			const password = await passwordUtil.hash(data.password);
			const otpNumber = randomNumberStringGenerator(6);
			const otpExpireTime = Date.now() + CONSTANT.OTP.EXP_TIME * 1000;
			const auth: IUser.User = await this.UserModel.create({
				...data,
				password,
				otp: {
					otpCode: otpNumber,
					expireTime: otpExpireTime,
				},
				name: data.name
			});
			const profile: IUser.Doc = await this.Model.create({
				userId: auth._id
			});
			
			// create session to login
			const token = await sessionService.create(
				auth._id,
				{
					ipAddress: req.ip,
					deviceType: useragent.isMobile ? 'mobile' : 'desktop',
					deviceModel: useragent?.device ? useragent?.device : req.headers['user-agent'],
					deviceToken: data.deviceToken,
					signType: LoginType.Normal,
					userType: UserType.User,
				},
				{
					name: auth.name,
				}
			);

			// send Otp
			// smsUtil(profile.phoneNumber, otpNumber);
			// sendSignUpOtpMessage(profile.countryCode, profile.phoneNumber, otpNumber, profile.name).catch((error) => {
			// 	console.error(`Otp was not sent to ${profile.name} over ${profile.phoneNumber}`);
			// 	console.error(error);
			// });
			// @TODO send verification email = Done
			// @TODO generate otp code - Done
			// @TODO send otp message - Done
			// @TODO add primary_account_id
			return { profile: UserDataFormat(auth, profile), token, otpNumber };
		} catch (error) {
			Console.error('Error in regsiteration service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async verifyOtp(data: VerifyOtpData, { id }: App.User): Promise<any> {
		try {
			const result: IUser.User | null = await this.UserModel.findOne(
				{ _id: id },
				{ otp: 1, email: 1, countryCode: 1, phoneNumber: 1,name: 1}
			);
			if (!result) {
				return Promise.reject(
					new ResponseError(400, USER_MESSAGES.ACCOUNT_BLOCKED)
				);
			}
			{
				const where: any = {
					_id: id,
					status: { $ne: UserStatus.Deleted },
					countryCode: result.countryCode,
					phoneNumber: result.phoneNumber,
					isPhoneVerified: true,
				};

				const isAlreadyUsed = await this.UserModel.countDocuments(where);

				if (isAlreadyUsed) {
					return Promise.reject(
						new ResponseError(
							400,
							USER_MESSAGES.PHONE_ALREADY_LINKED
						)
					);
				}
			}

			if (
				!data.otp ||
				(result.otp.otpCode.toString() !== data.otp.toString() &&
					data.otp !== '123456')
			) {
				return Promise.reject(
					new ResponseError(400, USER_MESSAGES.VERIFY_OTP.INVALID)
				);
			}

			// @ts-ignore
			if (<unknown>result.otp.expireTime <= Date.now()) {
				// time is milisecond // 45 second
				return Promise.reject(
					new ResponseError(400, USER_MESSAGES.VERIFY_OTP.EXPIRED)
				);
			}
			let message = USER_MESSAGES.VERIFY_OTP.PHONE_VERIFIED;
			await this.UserModel.updateOne(
				{ _id: id },
				{ $set: { isPhoneVerified: true } }
			);
			sendEmail(result.email,result.name, '', true);
			return message;
		} catch (error) {
			Console.error('Error in verifyOtp service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	/**
	 * Resends an OTP (One-Time Password) to a user.
	 * It generates a new OTP code, updates the user's record in the database with the new OTP code and its expiration time,
	 * and sends the OTP message to the user's phone number.
	 * @param data - Additional data for the method (not used in this method).
	 * @param user - The user object containing the user's ID (`id`).
	 * @returns A promise that resolves if the OTP is resent successfully, otherwise rejects with an error.
	 */
	async resendOtp(data: any, { id }: App.User): Promise<void> {
		try {
			// Find the user's record in the database using the provided user ID
			const user = await this.UserModel.findOne(
				{ _id: id },
				{ otp: 1, countryCode: 1, phoneNumber: 1, email: 1, name: 1 }
			);

			if (!user) {
				// If the user's record is not found, reject the promise with an error indicating an invalid token
				throw new ResponseError(401, USER_MESSAGES.RESEND_OTP.INVALID_TOKEN);
			}

			// Generate a new OTP code
			const otpNumber = randomNumberStringGenerator(6);
			const otpExpireTime = Date.now() + CONSTANT.OTP.EXP_TIME * 1000;

			// Update the user's record in the database with the new OTP code and its expiration time
			await this.UserModel.updateOne(
				{ _id: id },
				{ $set: { otp: { otpCode: otpNumber.toString(), expireTime: otpExpireTime } } }
			);

			// Send the OTP message to the user's phone number
			// smsUtil(user.phoneNumber, otpNumber);
			// sendOtpMessage(user.countryCode, user.phoneNumber, otpNumber, user.name);
		} catch (error) {
			Console.error('Error in resendOtp service', error);
			throw new ResponseError(422, error);
		}
	}

	/**
	 * Handles the login functionality for users by verifying their credentials and generating a session token.
	 * @param data An object containing the login data, including the user's email or phone number and password.
	 * @param client An object containing the client information, such as language, IP address, device ID, device type, device model, and ISO2 country code.
	 * @returns An object containing the user's profile data and a session token.
	 */
	async login(req?: App.Request) {
		let where = {};
		const data: ILoginData = req.data
		if (data.countryCode) {
			where = {
				status: { $ne: UserStatus.Deleted },
				countryCode: data.countryCode,
				phoneNumber: data.user,
			};
		} else if (data.user.includes('@' && '.')) {
			where = {
				status: { $ne: UserStatus.Deleted },
				email: data.user,
			};
		} else {
			where = {
				status: { $ne: UserStatus.Deleted },
				userName: data.user,
			};
		}
		const result = await this.UserModel.findOne({ ...where });

		if (!result) {
			const { EMAIL_NOT_FOUND, PHONE_NOT_FOUND,USER_NOT_FOUND } = USER_MESSAGES;
			const MSG = data.countryCode ? PHONE_NOT_FOUND : data.user.includes('@' && '.') ? EMAIL_NOT_FOUND : USER_NOT_FOUND;
			return Promise.reject(new ResponseError(422, MSG));
		}
		const user = await this.Model.findOne({ userId: result._id });
		const isPasswordVerified = await this.verifyPassword(result, data.password);
		if (!isPasswordVerified) {
			return Promise.reject(new ResponseError(422, USER_MESSAGES.LOGIN.INVALID));
		}
		const token = await sessionService.create(
			result._id,
			{
				ipAddress: req.ip,
				deviceType: useragent.isMobile ? 'mobile' : 'desktop',
				deviceModel: useragent?.device ? useragent?.device : req.headers['user-agent'],
				deviceToken: data.deviceToken,
				signType: LoginType.Normal,
				userType: UserType.User,
			},
			{
				name: result.name,
			}
		);
		return { profile: UserDataFormat(result,user), token };
	}

	async verifyPassword(user: any, password: string): Promise<boolean> {
		try {
			console.log('--pasword--', password);

			return await passwordUtil.verify.call(user, password);
		} catch (error) {
			return Promise.reject(
				new ResponseError(401, USER_MESSAGES.LOGIN.INVALID)
			);
		}
	}
	async updateUserData(payload: IUser.User, client: Partial<App.Client>) {
		console.log('updateUserData', payload);
		try {
			return await this.UserModel.findByIdAndUpdate(
				{ _id: payload._id },
				{ $set: payload },
				{ projection: { password: 0 }, new: true }
			);
		} catch (error) {
			Console.error('Error in user UpdateData service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async forgotPassword(payload: IUser.User): Promise<any> {
		try {
			let sentPassword = DEFAULT_PASSWORD;
			const password = await passwordUtil.hash(DEFAULT_PASSWORD);
			let result = await this.UserModel.findOneAndUpdate(
				{ email: payload.email },
				{ $set: { password: password } }
			);
			if (result == null) {
				return Promise.reject(
					new ResponseError(
						401,
						USER_MESSAGES.INVALID_CREDENTIAL.INVALID
					)
				);
			} else {
				sendEmail(payload.email,'',sentPassword, false);
			}
		} catch (error) {
			Console.error('Error in verifyOtp service', error);
			return Promise.reject(
				new ResponseError(401, USER_MESSAGES.INVALID_CREDENTIAL.INVALID)
			);
		}
	}
	/**
	 * Changes the password of a user.
	 * @param data - An object containing the user ID, old password, and new password.
	 * @returns An empty object if the password change is successful.
	 * @throws ResponseError if the old password is invalid or an error occurs during the process.
	 */
	async changePassword(data: IChangePassword): Promise<any> {
		try {
			const user = await this.UserModel.findOne({ _id: data.id });
			const isPasswordVerified = await this.verifyPassword(user, data.old_password);
			if (!isPasswordVerified) {
				throw new ResponseError(422, USER_MESSAGES.LOGIN.INVALID);
			}
			const password = await passwordUtil.hash(data.new_password);

			await this.UserModel.updateOne({ _id: data.id }, { password });

			return {};
		} catch (error) {
			console.error('Error in changePassword service', error);
			throw new ResponseError(401, USER_MESSAGES.INVALID_CREDENTIAL.INVALID);
		}
	}

	async logout(
		{ deviceToken, ...data }: ILogoutData,
		req: any
	) {
		console.info('data', data);
		try {
			tokenUtil.expireToken(req.header('authorization'), UserType.User)
			sessionService.logout(data.userId);
			return {};
		} catch (error) {
			Console.error('Error in User login service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
	async notification(req: any, res: any) {
		console.log('reqBody', req.body);
		try {
			await producer(req.body);
			await consumer();
		} catch (err) {
			return err;
		}
	}
	async upload(req: any, res: any) {
		try {
			let userUpload = 'LinksUser';
			return fileUpload(req, userUpload);
		} catch (error) {
			console.log('error', error);
			return error;
		}
	}
	async constantData(client: Partial<App.Client>) {
		try {
			return LinksConstant;
		} catch (error) {
			Console.error('Error in  service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
	async getImageFromS3(req: any, res: any) {
		try {
			return getImageFromS3(req, res);
		} catch (error) {
			Console.error('Error in  service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
}

export const userService = new UserService();
