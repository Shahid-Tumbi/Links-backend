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
exports.sessionService = void 0;
const session_model_1 = require("./session.model");
const index_1 = require("../../../utils/index");
const jwt_util_1 = require("../../../utils/jwt.util");
const constants_1 = require("../../constants");
const api_constants_1 = require("../api.constants");
const redis_util_1 = require("../../../utils/redis.util");
const user_model_1 = require("../user/user.model");
class SessionService {
    constructor() {
        this.Model = session_model_1.SessionModel;
    }
    isTokenActive(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isSession = userId && (yield redis_util_1.redisUtil.authorize(userId, sessionId));
                if (!isSession) {
                    const user = userId && (yield user_model_1.User.findById(userId, { name: 1 }));
                    const count = yield session_model_1.SessionModel.countDocuments({
                        status: true, _id: sessionId
                    });
                    if (!count) {
                        return false;
                    }
                    if (userId) {
                        yield redis_util_1.redisUtil.createSession(userId, sessionId, user);
                    }
                }
                return true;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * Remove Users Session
     * @param userData UserData
     */
    expireByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield session_model_1.SessionModel.findOneAndUpdate({ userId: userId, status: true }, { status: false }, { new: true });
                yield redis_util_1.redisUtil.expireSession(userId);
                return result;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * Creates User Session
     * @param payload IUserSession
     * @param userData UserData
     */
    create(userId, data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.Console.info('Inside create session');
                index_1.Console.info(data);
                // expire previous session
                yield this.expireByUser(userId);
                const result = yield session_model_1.SessionModel.create(Object.assign(Object.assign({}, data), { userId: userId }));
                yield redis_util_1.redisUtil.createSession(result.userId, result._id, user);
                return jwt_util_1.tokenUtil.generateAuthToken({
                    id: result.userId,
                    session: result._id,
                    type: constants_1.UserType.User,
                }, result.userType, '180d');
            }
            catch (error) {
                console.error(`we have an error ${error}`);
                return Promise.reject(error);
            }
        });
    }
    update(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update session only where status is true
            const response = yield this.Model.findOneAndUpdate({ user_id, status: true }, data, { new: true });
            return response;
        });
    }
    getSessionDataByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.Model.findOne({
                where: { user_id },
                attributes: ['socket_id'],
                order: [['created_at', 'desc']],
                raw: true,
            });
            return response;
        });
    }
    getSessionDataByUserIds(user_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Model.find({
                $match: {
                    $in: { userId: user_ids },
                    status: api_constants_1.CONSTANT.DATABASE.STATUS.ACTIVE,
                }
            });
        });
    }
    deviceTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.Model.find({
                userId: userId, status: true
            });
            return sessions.map((s) => s.deviceToken);
        });
    }
    updateToken(userId, deviceToken, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { userId: userId, status: true };
            if (deviceId) {
                where.deviceId = deviceId;
            }
            yield this.Model.updateMany(where, { deviceToken });
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionData = yield this.Model.findOneAndUpdate({ userId: id }, { status: false }, { new: true });
            yield redis_util_1.redisUtil.expireSession(sessionData.userId, sessionData._id);
            return sessionData;
        });
    }
}
exports.sessionService = new SessionService();
