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
exports.redisUtil = void 0;
const redis_db_1 = require("../database/redis.db");
class RedisUtil {
    constructor() {
        // create redis client
        redis_db_1.redisDAO.createConn();
    }
    createSession(userId, sessionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (redis_db_1.redisDAO.isServiceAvailable) {
                console.log(userId, sessionId, user);
                const data = yield redis_db_1.redisDAO.findSession(userId);
                console.log(userId, sessionId, data);
                const sessions = (data === null || data === void 0 ? void 0 : data.sessions) || {};
                sessions[sessionId] = true;
                yield redis_db_1.redisDAO.setSession(userId, Object.assign(Object.assign({}, user), { sessions }));
                console.log(userId, sessionId);
            }
        });
    }
    expireSession(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Expire Session', userId, sessionId);
            const data = yield redis_db_1.redisDAO.findSession(userId);
            console.log('Expire Session', userId, sessionId, data);
            if (data) {
                if (sessionId) {
                    delete data.sessions[sessionId];
                }
                if (!sessionId || !Object.keys(data.sessions).length) {
                    return yield redis_db_1.redisDAO.delSession(userId);
                }
                yield redis_db_1.redisDAO.setSession(userId, data);
            }
        });
    }
    authorize(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield redis_db_1.redisDAO.findSession(userId);
            return result && result.sessions[sessionId];
        });
    }
}
exports.redisUtil = new RedisUtil();
