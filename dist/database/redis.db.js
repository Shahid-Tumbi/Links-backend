"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDAO = void 0;
const redis_1 = require("redis");
const logger_util_1 = require("../utils/logger.util");
const env_util_1 = require("../utils/env.util");
const util = require("util");
// import { Emitter } from '@socket.io/redis-emitter';
class RedisDAO {
    get isServiceAvailable() {
        const { host, port } = env_util_1.environment.redis || {};
        console.log(host, port);
        return host && port;
    }
    // tslint:disable-next-line: no-empty
    constructor() {
        this.Session = 'sessions';
    }
    createConn() {
        if (!this.isServiceAvailable) {
            logger_util_1.Console.warn('Redis service is not available');
            return;
        }
        if (this.client) {
            logger_util_1.Console.warn('Redis client is already created');
            return;
        }
        this.client = (0, redis_1.createClient)(env_util_1.environment.redis.port, env_util_1.environment.redis.host, { auth_pass: env_util_1.environment.redis.password });
        this.client.select(env_util_1.environment.redis.db || 9);
        // this.client.once('connection', () => {})
        // this.redisIO = new Emitter(this.client);
        logger_util_1.Console.info('Redis client is created successfully');
    }
    findSession(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_util_1.Console.info(userId);
            if (this.client) {
                return new Promise((resolve, reject) => {
                    this.client.hget(this.Session, userId.toString(), (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data && JSON.parse(data) || null);
                        }
                    });
                });
                // const session = await util.promisify(this.client.hget.bind(this.client))(this.Session, user_id);
                // 
                // return JSON.parse(session);
            }
            else {
                console.info('Redis Client Not found');
            }
        });
    }
    setSession(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield util.promisify(this.client.hmset.bind(this.client))([this.Session, user_id.toString(), JSON.stringify(data)]);
            }
        });
    }
    delSession(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield util.promisify(this.client.hdel.bind(this.client))(this.Session, user_id.toString());
            }
        });
    }
    updateSession(user_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                const session = yield this.findSession(user_id);
                if (!session) {
                    return null;
                }
                const final = Object.assign(Object.assign({}, session), update);
                yield this.setSession(user_id, final);
                return final;
            }
        });
    }
    /**
     * @method insertKeyInRedis
     * @description Used to insert key and value into redis database
     * @param key
     * @param value
     */
    insertKeyInRedis(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                const promise1 = util.promisify(this.client.set).bind(this.client);
                yield promise1(key.toString(), value.toString());
                return {};
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
        * @description Get socket ids from redis db stored corresponding to userId
        */
    getKeyFromRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                const promise1 = util.promisify(this.client.get).bind(this.client);
                const value = yield promise1(key.toString());
                return value;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
        * @description Delete socket ids from redis db stored corresponding to userId
        */
    delKeyFromRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_util_1.Console.info('-----------RedisKeyDelete-----------');
                logger_util_1.Console.info(key);
                if (!this.isServiceAvailable) {
                    return;
                }
                logger_util_1.Console.info('--------------KeyDeleted--------------');
                const promise1 = util.promisify(this.client.del).bind(this.client);
                const value = yield promise1(key);
                return value;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
        * @description Update room id one at a time from redis db stored corresponding to userId_room
        */
    insertSetInRedis(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                const promise1 = util.promisify(this.client.sadd).bind(this.client);
                yield promise1(userId.toString() + '_room', chatId.toString());
                return {};
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * used to save/update the array on a key i.e. user: [ socket1, socket2, socket3 ] etc.
     * @param key
     * @param data
     */
    insertDataIntoArray(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                if (!data.length) {
                    return {};
                }
                const promise1 = util.promisify(this.client.hmset).bind(this.client);
                const to_store = {};
                data.forEach((ele) => {
                    if (ele.toString()) {
                        to_store[ele.toString()] = '';
                    }
                    else {
                        to_store[ele] = '';
                    }
                });
                yield promise1(key, to_store);
                return {};
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * used to fetch the array values for a particular key
     * @param key
     */
    getArrayData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                const promise1 = util.promisify(this.client.hkeys).bind(this.client);
                return yield promise1(key);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * used to delete a value in array on a key i.e. socket1 delete from user: [ socket1, socket2, socket3 ] etc.
     * @param key
     * @param data
     */
    deleteDataFromArray(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                if (value && value.toString()) {
                    value = value.toString();
                }
                this.client.hdel(key, value);
                return {};
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * used to delete multi values from an array
     * i.e. [ socket1, socket2 ] delete from user: [ socket1, socket2, socket3 ] etc.
     * @param key
     * @param arr
     */
    deleteMultiDataFromArray(key, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < arr.length; i++) {
                    try {
                        yield this.deleteDataFromArray(key, arr[i]);
                    }
                    catch (er) {
                        return;
                    }
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * used to delete all items from an array
     * @param key
     */
    deleteFullArray(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                yield this.deleteMultiDataFromArray(key, yield this.getArrayData(key));
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    /**
     * Used to check redis key exists
     * @param key
     */
    checkKeyExistsInRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                const promise1 = util.promisify(this.client.exists).bind(this.client);
                const value = yield promise1(key);
                if (value === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
        * @method SetKeyIfNotExistInRedis
        * @description Used to insert key and value into redis database
        * @param key
        * @param value
        */
    setKeyIfNotExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isServiceAvailable) {
                    return;
                }
                if (key && key.toString()) {
                    key = key.toString();
                }
                const promise1 = util.promisify(this.client.setnx).bind(this.client);
                const result = yield promise1(key.toString(), value.toString());
                return result;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.redisDAO = new RedisDAO();
