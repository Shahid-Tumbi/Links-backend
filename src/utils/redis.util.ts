import { redisDAO } from '@src/database/redis.db';
import { App } from '@app/app.interface';

class RedisUtil {
	constructor() {
		// create redis client
		redisDAO.createConn();
	}
	async createSession(userId: string, sessionId: string, user: App.SessionUser) {
		if (redisDAO.isServiceAvailable) {
			console.log(userId, sessionId, user);
			const data = await redisDAO.findSession(userId);
			console.log(userId, sessionId, data);
			const sessions = data?.sessions || {};
			sessions[sessionId] = true;
			await redisDAO.setSession(userId, { ...user, sessions });
			console.log(userId, sessionId);
		}
	}
	async expireSession(userId: string, sessionId?: string) {
		console.log('Expire Session', userId, sessionId);
		const data = await redisDAO.findSession(userId);
		console.log('Expire Session', userId, sessionId, data);
		if (data) {
			if (sessionId) {
				delete data.sessions[sessionId];
			}
			if (!sessionId || !Object.keys(data.sessions).length) {
				return await redisDAO.delSession(userId);
			}
			await redisDAO.setSession(userId, data);
		}
	}
	async authorize(userId: string, sessionId: string): Promise<boolean> {
		const result = await redisDAO.findSession(userId);
		return result && result.sessions[sessionId];
	}
}

export const redisUtil = new RedisUtil();
