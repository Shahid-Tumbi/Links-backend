import { AdminSessionModel } from './admin.session.model';
import { Console } from '@utils/index';
import { tokenUtil } from '@utils/jwt.util';
import { UserType } from '@app/constants';
import { CONSTANT } from '@api/api.constants';
import { redisUtil } from '@utils/redis.util';
import { UserModel } from '@api/user/user.model';
import { App } from '@src/app/app.interface';
import { IUserSession } from './admin.session.interface';

class SessionService {
	readonly Model = AdminSessionModel;


	async removePreviousSession({ ...data }) {
		try {
			const existingSession = await this.Model.findOne(data, { loginStatus: 1 });

			if (existingSession && existingSession.loginStatus) {
				await this.Model.remove({ email: data.emailId });
			}
			return {};
		} catch (error) {
			return Promise.reject(error);
		}
	}

	// async createAdminSesion(payload) {
	// 	try {
	// 		const result: IUserSession = await this.Model.create({
	// 			payload,
	// 			adminId: payload.adminId
	// 		});
	// 		Console.info(result);
	// 		await redisUtil.createSession(result.userId, result._id, payload);
	// 		return tokenUtil.generateAuthToken({
	// 			id: result.userId,
	// 			session: result._id,
	// 			type: UserType.Admin,
	// 		}, result.userType, '180d');
	// 	} catch (error) {
	// 		return Promise.reject(error);
	// 	}
	// }

	async isTokenActive(userId: string, sessionId: string): Promise<boolean> {
		try {
			const isSession = userId && await redisUtil.authorize(userId, sessionId);
			if (!isSession) {
				const user = userId && await UserModel.findById(userId, { name: 1 });
				const count = await AdminSessionModel.countDocuments({
					status: true, _id: sessionId
				});
				if (!count) {
					return false;
				}
				if (userId) {
					await redisUtil.createSession(userId, sessionId, user);
				}
			}
			return true;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Remove Users Session
	 * @param userData UserData
	 */
	async expireByUser(userId: string) {
		try {
			const result = await AdminSessionModel.findOneAndUpdate(
				{ adminId: userId, status: true },
				{ status: false },
				{ new: true }
			);
			await redisUtil.expireSession(userId);
			return result;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Creates User Session
	 * @param payload IUserSession
	 * @param userData UserData
	 */
	async create(adminId: string, data: IUserSession, user: App.SessionUser): Promise<string> {
		try {
			Console.info('Inside create session');
			Console.info(data);
			// expire previous session
			await this.expireByUser(adminId);
			const result:any = await AdminSessionModel.create({
				...data,
				adminId: adminId
			});
			result.userType = UserType.Admin;
			Console.info(result);
			await redisUtil.createSession(result.adminId, result._id, user);
			return tokenUtil.generateAuthToken({
				id: result.adminId,
				session: result._id,
				type: UserType.Admin,
			}, result.userType, '180d');
		} catch (error) {
			console.error(`we have an error ${error}`)
			return Promise.reject(error);
		}
	}

	async update(user_id: string, data: IUserSession) {
		// Update session only where status is true
		const response = await this.Model.findOneAndUpdate({ user_id, status: true }, data, { new: true });
		return response;
	}

	async getSessionDataByUserId(user_id: string) {
		const response = await this.Model.findOne({
			where: { user_id },
			attributes: ['socket_id'],
			order: [['created_at', 'desc']],
			raw: true,
		});
		return response;
	}


	async getSessionDataByUserIds(user_ids: any[]) {
		return await this.Model.find(
			{
				$match: {
					$in: { userId: user_ids },
					status: CONSTANT.DATABASE.STATUS.ACTIVE,
				}
			});
	}

	async deviceTokens(userId: string): Promise<string[]> {
		const sessions: IUserSession[] = await this.Model.find({
			userId: userId, status: true
		}
		);
		return sessions.map((s) => s.deviceToken);
	}
	async updateToken(userId: string, deviceToken: string, deviceId: string) {
		const where: any = { adminId: userId, status: true };
		if (deviceId) {
			where.deviceId = deviceId;
		}
		await this.Model.updateMany(where, { deviceToken });
	}
	async logout(id: string) {
		const sessionData = await this.Model.findOneAndUpdate({ _id: id }, { status: false }, { new: true });
		await redisUtil.expireSession(sessionData.adminId, sessionData._id);
		return sessionData;
	}
}

export const adminSessionService = new SessionService();