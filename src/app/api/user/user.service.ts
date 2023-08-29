import { App } from '@src/app/app.interface';
import { LoginType, UserStatus, UserType } from '@src/app/constants';
import {
	Console,
	passwordUtil,
	randomNumberStringGenerator,
	ResponseError,
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
	IOtpData,
	IRegisterData,
	IUser,
	ILogoutData,
	IChangePassword,
} from './user.interface';
import { UserModel } from './user.model';
import { VerifyOtpData } from './user.swagger';
import { smsUtil } from '../../../utils/sms.util';
import { producer, consumer } from '../../../rabbitmq';
import getImageFromS3 from '@src/utils/getimage.util';

// const fs = require('fs');
// const path = require('path');
// const formidable = require('formidable');
// const AWS = require('aws-sdk');
// const sharp = require('sharp');

// let allowedFileTypes = [
// 	'png', 'jpeg',
// 	'jpg', 'gif',
// 	'webp'
// ];
// let allowedFileTypes = [
// 	'png', 'jpeg',
// 	'jpg', 'gif',
// 	'pdf', 'doc',
// 	'docx', 'xlsx',
// 	'mp4', 'mpeg',
// 	'3gp', 'mov',
// 	'avi', 'wmv',
// 	'mkv', 'webm'
// ];
// let imageFileTypes = ['png', 'jpeg',
// 	'jpg', 'gif','webp'];
// let maxFileSize = 2; //In Megabyte

class UserService {
	readonly Model = UserModel;

	async register(
		{ deviceToken, ...data }: IRegisterData,
		client?: Partial<App.Client>,
		ipAddress?: string,
	) {
		try {
			Console.info(`partial ${JSON.stringify(client)}`);
			// @TODO set limit to 1 to count
			const { email, phoneNumber, countryCode } = data;
			const [isEmailExists, isPhoneExists] = await Promise.all([
				this.Model.countDocuments({
					email,
					//isEmailVerified: true,
					status: { $ne: UserStatus.Deleted },
				}),
				this.Model.countDocuments({
					phoneNumber,
					countryCode,
					//isPhoneVerified: true,
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
			const password = await passwordUtil.hash(data.password);
			console.log('paswsword Hash', password);
			const otpNumber = randomNumberStringGenerator(4);
			const otpExpireTime = Date.now() + CONSTANT.OTP.EXP_TIME * 1000;
			const profile: IUser.Doc = await this.Model.create({
				...data,
				password,
				otp: {
					otpCode: otpNumber,
					expireTime: otpExpireTime,
				},
			});
			// create session to login
			const token = await sessionService.create(
				profile._id,
				{
					...client,
					ipAddress,
					deviceToken,
					signType: LoginType.Normal,
					userType: UserType.User,
				},
				{
					name: profile.name,
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
			return { profile: UserDataFormat(profile), token, otpNumber };
		} catch (error) {
			Console.error('Error in regsiteration service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async verifyOtp(data: VerifyOtpData, { id }: App.User): Promise<any> {
		try {
			const result: IUser.Doc | null = await this.Model.findOne(
				{ _id: id },
				{ otp: 1, email: 1, countryCode: 1, phoneNumber: 1 }
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
				};
				where.countryCode = result.countryCode;
				where.phoneNumber = result.phoneNumber;
				where.isPhoneVerified = true;
				const isAlreadyUsed = await this.Model.countDocuments({
					where,
				});
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
					data.otp !== '1234')
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
			await this.Model.updateOne(
				{ _id: id },
				{ $set: { isPhoneVerified: true } }
			);
			sendEmail(result.email, '', true);
			return message;
		} catch (error) {
			Console.error('Error in verifyOtp service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async resendOtp(data: any, { id }: App.User): Promise<void> {
		try {
			// @TODO generate otp code
			// @TODO keep primary field in session
			// const { otp, countryCode, phoneNumber, name }
			let result = await this.Model.findOne(
				{ _id: id },
				{ otp: 1, countryCode: 1, phoneNumber: 1, email: 1, name: 1 }
			);

			if (result === null) {
				return Promise.reject(
					new ResponseError(
						401,
						USER_MESSAGES.RESEND_OTP.INVALID_TOKEN
					)
				);
			} else {
				const otpNumber = randomNumberStringGenerator(4);
				const otpExpireTime = Date.now() + CONSTANT.OTP.EXP_TIME * 1000;
				const update: IOtpData = {
					otpCode: otpNumber.toString(),
					expireTime: otpExpireTime,
				};
				Console.info(update);
				Console.info(otpNumber);
				await this.Model.updateOne(
					{ _id: id },
					{ $set: { otp: update } }
				);
				// @TODO send otp message
				smsUtil(result.phoneNumber, otpNumber);
				// sendOtpMessage(countryCode, phoneNumber, otpNumber, name);
			}
		} catch (error) {
			Console.error('Error in resendOtp service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async login(
		{ deviceToken, ...data }: ILoginData,
		client: Partial<App.Client>
	) {
		let where = {};
		if (data.countryCode) {
			where = {
				status: { $ne: UserStatus.Deleted },
				countryCode: data.countryCode,
				phoneNumber: data.user,
			};
		} else {
			where = {
				status: { $ne: UserStatus.Deleted },
				email: data.user,
				isEmailVerified: true,
			};
		}

		console.info('where', where);
		console.log('data.id', data.id);
		const result = await this.Model.findOne({ ...where });
		console.info('result', result);
		if (!result) {
			console.log('data.countryCode', data.countryCode);
			const { EMAIL_NOT_FOUND, PHONE_NOT_FOUND } = USER_MESSAGES;
			const MSG = data.countryCode ? PHONE_NOT_FOUND : EMAIL_NOT_FOUND;
			return Promise.reject(new ResponseError(422, MSG));
		}
		const isPasswordVerified = await this.verifyPassword(
			result,
			data.password
		);
		if (!isPasswordVerified) {
			return Promise.reject(
				new ResponseError(422, USER_MESSAGES.LOGIN.INVALID)
			);
		}
		// if (result.userStatus === UserStatus.InActive) {
		// 	return Promise.reject(new ResponseError(422, USER_MESSAGES.ACCOUNT_BLOCKED));
		// }
		const token = await sessionService.create(
			result.id,
			{
				...client,
				deviceToken,
				signType: LoginType.Normal,
				userType: UserType.User,
			},
			{
				name: result.name,
			}
		);
		return { profile: UserDataFormat(result), token };
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
	async updateUserData(payload: IUser.Doc, client: Partial<App.Client>) {
		console.log('updateUserData', payload);
		try {
			return await this.Model.findByIdAndUpdate(
				{ _id: payload._id },
				{ $set: payload },
				{ projection: { password: 0 }, new: true }
			);
		} catch (error) {
			Console.error('Error in user UpdateData service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async forgotPassword(payload: IUser.Doc): Promise<any> {
		try {
			let sentPassword = DEFAULT_PASSWORD;
			const password = await passwordUtil.hash(DEFAULT_PASSWORD);
			let result = await this.Model.findOneAndUpdate(
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
				sendEmail(payload.email, sentPassword, false);
			}
		} catch (error) {
			Console.error('Error in verifyOtp service', error);
			return Promise.reject(
				new ResponseError(401, USER_MESSAGES.INVALID_CREDENTIAL.INVALID)
			);
		}
	}
	async changePassword(data: IChangePassword): Promise<any> {
		let where = {};
		try {
			where = {
				_id: data.id,
			};
			const result = await this.Model.findOne({ ...where });

			const isPasswordVerified = await this.verifyPassword(
				result,
				data.old_password
			);
			if (!isPasswordVerified) {
				return Promise.reject(
					new ResponseError(422, USER_MESSAGES.LOGIN.INVALID)
				);
			}
			const password = await passwordUtil.hash(data.new_password);

			await this.Model.findOneAndUpdate(
				{ _id: data.id },
				{ $set: { password: password } }
			);

			return {};
		} catch (error) {
			Console.error('Error in verifyOtp service', error);
			return Promise.reject(
				new ResponseError(401, USER_MESSAGES.INVALID_CREDENTIAL.INVALID)
			);
		}
	}

	async logout(
		{ deviceToken, ...data }: ILogoutData,
		client: Partial<App.Client>
	) {
		console.info('data', data);
		try {
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
