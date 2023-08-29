// import { environment } from './';
// import { redisDAO } from '@src/database/redis.db';
// import * as redis from 'redis';
// import { CONSTANT } from '@api/api.constants';
// import { Console } from './logger.util';

// /**
//  * The class to control the redis key expiry related activities i.e. setup, listening of callbacks
//  */
// class RedisKeyListner {
// 	client: any;

// 	constructor() {
// 		if (environment.redis && environment.redis.host && environment.redis.host !== '') {
// 			redisDAO.createConn();
// 			this.client = redisDAO.client;
// 			this.client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], this.SubscribeExpired);
// 		}
// 	}

// 	checkRedisServiceAvailable(): boolean {
// 		if (environment.redis && environment.redis.host && environment.redis.host !== '') {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}

// 	/**
// 	 * Redis key expiry manager
// 	 * @param e
// 	 * @param r
// 	 */
// 	private SubscribeExpired(e: any, r: any) {
// 		const expired_subKey = '__keyevent@' + (environment.redis.db || 9) + '__:expired';
// 		const sub = redis.createClient(environment.redis.port, environment.redis.host);
// 		sub.select(environment.redis.db || 9);

// 		sub.subscribe(expired_subKey, () => {
// 			// global.log(' [i] Subscribed to "' + expired_subKey + '" event channel : ' + r);
// 			Console.info(`[i] Subscribed to ${expired_subKey} event channel ${r}`);
// 			// redis key example 4<_>5dca3f790fcdc971111894ed<_>_
// 			sub.on('message', async (chan, msg) => {
// 				Console.info(`expired ${msg}: chan:  ${chan}`);
// 				const { keyData } = getRedisExpiryKeyContent(msg);
// 				// global.log({ keyData, redisToken });

// 				const checkInRedis = await redisDAO.setKeyIfNotExist(msg, 'deleteme');
// 				// consolelog('checkInRedis', checkInRedis, true);
// 				if (checkInRedis === 0) {
// 					// Key was set already by another instance so take a uturn from here
// 					redisDAO.delKeyFromRedis(msg);
// 					return;
// 				}
// 			});
// 		});
// 	}

// 	/**
// 	 * Used to set the redis key expiry time
// 	 * @param key
// 	 * @param time in seconds
// 	 */
// 	setExpiryKey(key: any, time: any) {
// 		Console.info('-------------SetExpiryKey----------------');
// 		Console.info(key);
// 		Console.info(time);
// 		if (!this.checkRedisServiceAvailable()) { return; }
// 		Console.info('-------------SetExpiryKey123----------------');
// 		// this.client.set(key, 'redis notify-keyspace-events : expired');
// 		this.client.expire(key, time);
// 	}
// 	/**
// 	 * Set Key with data
// 	 * @param key
// 	 * @param data
// 	 */
// 	setKeyWithData(key: any, data: any) {
// 		if (!this.checkRedisServiceAvailable()) { return; }
// 		Console.info('-------------SetExpiryKey123----------------');
// 		this.client.set(key, data);
// 	}

// 	/**
// 	 * Used to update redis key expiry time
// 	 * @param key
// 	 * @param time in seconds
// 	 */
// 	updateExpiryTime(key: any, time: any) {
// 		if (!this.checkRedisServiceAvailable()) { return; }
// 		// global.log('redis key updated', key, time);
// 		this.client.expire(key, time);
// 	}

// 	/**
// 	 * Used to remove the key from the redis database
// 	 * @param key
// 	 */
// 	removeKey(key: any) {
// 		if (!this.checkRedisServiceAvailable()) { return; }
// 		this.client.del(key);
// 	}
// }

// export const redisKeyListner = new RedisKeyListner();

// /**
//  * Used to generate redis expiry key
//  * @param data
//  */
// export const redisExpiryKeyGenerator = (data: any) => {
// 	// const redisToken = '_';
// 	// if (global.redisTokens.length) { redisToken = global.redisTokens[0]; }
// 	switch (data.type) {
// 		case CONSTANT.REDIS.LIVE.SESSION_END: {
// 			return CONSTANT.REDIS.LIVE.SESSION_END + '<_>' + data.live_id;
// 		}
// 	}
// };

// /**
//  * Used to get data from the redis expiry key
//  * @param key
//  */
// export const getRedisExpiryKeyContent = (key: any) => {
// 	const data = key.split('<_>');
// 	// tslint:disable-next-line: radix
// 	// const arr = [parseInt(data.shift())];
// 	// arr.push(...data);
// 	// const redisToken: any = arr.pop();
// 	return { keyData: data };
// };
