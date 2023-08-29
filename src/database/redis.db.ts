import { createClient, RedisClient } from 'redis';
import { Console } from '@utils/logger.util';
import { environment } from '@utils/env.util';
import * as util from 'util';
import { App } from '@app/app.interface';
// import { Emitter } from '@socket.io/redis-emitter';

class RedisDAO {
	readonly Session = 'sessions';
	get isServiceAvailable(): boolean {
		const { host, port } = environment.redis || {};
		console.log(host, port)
		return host && port;
	}
	client?: RedisClient;
	redisIO: any;
	// tslint:disable-next-line: no-empty
	constructor() { }
	createConn() {

		if (!this.isServiceAvailable) {

			Console.warn('Redis service is not available');
			return;
		}
		if (this.client) {
			Console.warn('Redis client is already created');
			return;
		}
		this.client = createClient(environment.redis.port, environment.redis.host, { auth_pass: environment.redis.password });
		this.client.select(environment.redis.db || 9);
		// this.client.once('connection', () => {})
		// this.redisIO = new Emitter(this.client);
		Console.info('Redis client is created successfully');
	}
	async findSession(userId: string): Promise<App.SessionData | null> {
		Console.info(userId)
		if (this.client) {
			return new Promise((resolve, reject) => {
				this.client.hget(this.Session, userId.toString(), (err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data && JSON.parse(data) || null);
					}
				});
			});
			// const session = await util.promisify(this.client.hget.bind(this.client))(this.Session, user_id);
			// 
			// return JSON.parse(session);
		} else {
			console.info('Redis Client Not found');
		}
	}
	async setSession(user_id: string, data: App.SessionData) {
		if (this.client) {
			await util.promisify(this.client.hmset.bind(this.client))([this.Session, user_id.toString(), JSON.stringify(data)]);
		}
	}
	async delSession(user_id: string) {
		if (this.client) {
			await util.promisify(this.client.hdel.bind(this.client))(this.Session, user_id.toString());
		}
	}
	async updateSession(user_id: string, update: App.SessionUser) {
		if (this.client) {
			const session = await this.findSession(user_id);
			if (!session) {
				return null;
			}
			const final = { ...session, ...update };
			await this.setSession(user_id, final);
			return final;
		}
	}
	/**
	 * @method insertKeyInRedis
	 * @description Used to insert key and value into redis database
	 * @param key
	 * @param value
	 */
	async insertKeyInRedis(key: string, value: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			const promise1 = util.promisify(this.client.set).bind(this.client);
			await promise1(key.toString(), value.toString());
			return {};
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
		* @description Get socket ids from redis db stored corresponding to userId
		*/
	async getKeyFromRedis(key: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			const promise1 = util.promisify(this.client.get).bind(this.client);
			const value = await promise1(key.toString());
			return value;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
		* @description Delete socket ids from redis db stored corresponding to userId
		*/
	async delKeyFromRedis(key: string) {
		try {
			Console.info('-----------RedisKeyDelete-----------');
			Console.info(key);
			if (!this.isServiceAvailable) { return; }
			Console.info('--------------KeyDeleted--------------');
			const promise1 = util.promisify(this.client.del).bind(this.client);
			const value = await promise1(key);
			return value;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
		* @description Update room id one at a time from redis db stored corresponding to userId_room
		*/
	async insertSetInRedis(chatId: string, userId: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			const promise1 = util.promisify(this.client.sadd).bind(this.client);
			await promise1(userId.toString() + '_room', chatId.toString());
			return {};
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * used to save/update the array on a key i.e. user: [ socket1, socket2, socket3 ] etc.
	 * @param key
	 * @param data
	 */
	async insertDataIntoArray(key: string, data: any) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			if (!data.length) { return {}; }
			const promise1 = util.promisify(this.client.hmset).bind(this.client);
			const to_store : any = {};
			data.forEach((ele: any) => {
				if (ele.toString()) {
					to_store[ele.toString()] = '';
				} else {
					to_store[ele] = '';
				}
			});
			await promise1(key, to_store);
			return {};
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * used to fetch the array values for a particular key
	 * @param key
	 */
	async getArrayData(key: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			const promise1 = util.promisify(this.client.hkeys).bind(this.client);
			return await promise1(key);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * used to delete a value in array on a key i.e. socket1 delete from user: [ socket1, socket2, socket3 ] etc.
	 * @param key
	 * @param data
	 */
	async deleteDataFromArray(key: string, value: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			if (value && value.toString()) { value = value.toString(); }
			this.client.hdel(key, value);
			return {};
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * used to delete multi values from an array
	 * i.e. [ socket1, socket2 ] delete from user: [ socket1, socket2, socket3 ] etc.
	 * @param key
	 * @param arr
	 */
	async deleteMultiDataFromArray(key: string, arr: string[]) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			// tslint:disable-next-line: prefer-for-of
			for (let i = 0; i < arr.length; i++) {
				try {
					await this.deleteDataFromArray(key, arr[i]);
				} catch (er) {
					return;
				}
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * used to delete all items from an array
	 * @param key
	 */
	async deleteFullArray(key: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			await this.deleteMultiDataFromArray(key, await this.getArrayData(key));
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * Used to check redis key exists
	 * @param key
	 */
	async checkKeyExistsInRedis(key: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			const promise1 = util.promisify(this.client.exists).bind(this.client);
			const value = await promise1(key);
			if (value === 1) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return Promise.reject(error);
		}
	}
	/**
		* @method SetKeyIfNotExistInRedis
		* @description Used to insert key and value into redis database
		* @param key
		* @param value
		*/
	async setKeyIfNotExist(key: string, value: string) {
		try {
			if (!this.isServiceAvailable) { return; }
			if (key && key.toString()) { key = key.toString(); }
			const promise1 = util.promisify(this.client.setnx).bind(this.client);
			const result = await promise1(key.toString(), value.toString());
			return result;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export const redisDAO = new RedisDAO();
