import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { environment } from './env.util';
import * as uuid from 'uuid/v4';
import { UserType, AUTHORIZATION } from '@app/constants';
import { ResponseError } from './error.util';
import { App } from '@app/app.interface';
import { Console } from './logger.util';
import { sessionService } from '@api/session/session.service';
import { adminSessionService } from '@src/app/api/adminSession';

// redis can be used for it
const expiredTokens: Map<string, UserType> = new Map();

/**
 * @author Shahid Tumbi
 * @description A utility class to handle JWT operations
 */
class TokenUtil {
	async authorize(token: string, users: UserType[]): Promise<App.User> {
		try {
			// check token if its expired
			Console.info('Inside authorize123123');
			Console.info(expiredTokens);
			if (expiredTokens.has(token)) {
				return Promise.reject(new ResponseError(401, AUTHORIZATION.EXPIRED));
			}
			const verifiedUser = users.reduce((result: App.User | null, userType: UserType) => {
				if (result || userType === UserType.Default) {
					return result;
				}
				try {
					const user: App.User = this.verifyAuthToken(token, userType) as App.User;
					Console.info(user);
					return result || user;
				} catch (err) {
					if (err.name === 'JsonWebTokenError') {
						return null;
					}
					throw err;
				}
			}, null);
			Console.info('Verified User');
			Console.info(verifiedUser);
			if (!verifiedUser) {
				return Promise.reject(new ResponseError(401, AUTHORIZATION.NO_ACCESS));
			}
			let isSessionActive;
			if (users.includes(UserType.Admin) && verifiedUser.type === UserType.Admin) {
				isSessionActive = await adminSessionService.isTokenActive(verifiedUser.id, verifiedUser.session);
			} else {
				isSessionActive = await sessionService.isTokenActive(verifiedUser.id, verifiedUser.session);
			}

			if (!isSessionActive) {
				return Promise.reject(new ResponseError(401, AUTHORIZATION.EXPIRED));
			}
			if (verifiedUser.type === UserType.Admin) {
				// console.log(adminService);
				// verifiedUser.role = await adminService.getRoleForSession(verifiedUser.id);
				return verifiedUser;
			}
			return verifiedUser;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	/**
	 * @description A function to generate auth token while logging in.
	 * @param payload A payload data which will be stored in jwt.
	 * @param userType A user type for which token will be generated (secrets are different for different type of users)
	 * @param expiresIn A time in which jwt will be expired
	 */
	generateAuthToken(payload: { [key: string]: any }, userType: UserType, expiresIn?: number | string) {
		Console.info('aaaa', userType);
		const { authToken } = environment.secrets[userType];
		const options: SignOptions = {};
		if (expiresIn) {
			options.expiresIn = expiresIn;
		}
		return sign(payload, authToken, options);
	}
	/**
	 * @description A function to generate token which will be used to send over email to reset password.
	 * @param payload A payload data which will be stored in jwt.
	 * @param userType A user type for which token will be generated (secrets are different for different type of users)
	 * @param expiresIn A time in which jwt will be expired
	 */
	generatePwdMailToken(payload: { [key: string]: any }, userType: UserType, expiresIn?: number | string) {
		const { passwordMailToken } = environment.secrets[userType];
		const options: SignOptions = {};
		if (expiresIn) {
			options.expiresIn = expiresIn;
		}
		return sign(payload, passwordMailToken, options);
	}
	/**
	 * @description A method to verify auth token and extract data from it.
	 * @param {string} token A token to be verified
	 * @param {VerifyOptions} options options used while verifying token.
	 */
	verifyAuthToken<T extends object = any>(token: string, userType: UserType, options?: VerifyOptions): string | T {
		const { authToken } = environment.secrets[userType];
		return verify(token, authToken, options) as string | T;
	}
	/**
	 * @description A method to verify auth token and extract data from it.
	 * @param {string} token A token to be verified
	 * @param {VerifyOptions} options options used while verifying token.
	 */
	verifyPwdMailToken<T extends object = any>(token: string, userType: UserType, options?: VerifyOptions): string | T {
		const { passwordMailToken } = environment.secrets[userType.toLowerCase()];
		return verify(token, passwordMailToken) as string | T;
	}
	/**
	 * @description A function to generate unique id string with the help of uuid node module
	 * @returns {string} A unique id string
	 */
	generateId(): string {
		return uuid();
	}

	// async  isActive(sessionId: any): Promise<void> {
	// 	const data = await SessionModel.findOne({ _id: sessionId });
	// 	if (!data || !data.isActive) {
	// 		return Promise.reject(new ResponseError(400, 'sesssion expired'));
	// 	}
	// }
	expireToken(token: string, userType: UserType) {
		expiredTokens.set(token, userType);
	}
}

export const tokenUtil = new TokenUtil();