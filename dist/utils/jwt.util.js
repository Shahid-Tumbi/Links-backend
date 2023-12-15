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
exports.tokenUtil = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_util_1 = require("./env.util");
const uuid = require("uuid/v4");
const constants_1 = require("../app/constants");
const error_util_1 = require("./error.util");
const logger_util_1 = require("./logger.util");
const session_service_1 = require("../app/api/session/session.service");
// redis can be used for it
const expiredTokens = new Map();
/**
 * @author Shahid Tumbi
 * @description A utility class to handle JWT operations
 */
class TokenUtil {
    authorize(token, users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check token if its expired
                logger_util_1.Console.info('Inside authorize123123');
                logger_util_1.Console.info(expiredTokens);
                if (expiredTokens.has(token)) {
                    return Promise.reject(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.EXPIRED));
                }
                const verifiedUser = users.reduce((result, userType) => {
                    if (result || userType === constants_1.UserType.Default) {
                        return result;
                    }
                    try {
                        const user = this.verifyAuthToken(token, userType);
                        logger_util_1.Console.info(user);
                        return result || user;
                    }
                    catch (err) {
                        if (err.name === 'JsonWebTokenError') {
                            return null;
                        }
                        throw err;
                    }
                }, null);
                logger_util_1.Console.info('Verified User');
                logger_util_1.Console.info(verifiedUser);
                if (!verifiedUser) {
                    return Promise.reject(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.NO_ACCESS));
                }
                let isSessionActive;
                if (users.includes(constants_1.UserType.Admin) && verifiedUser.type === constants_1.UserType.Admin) {
                    // isSessionActive = await adminSessionService.isTokenActive(verifiedUser.id, verifiedUser.session);
                }
                else {
                    isSessionActive = yield session_service_1.sessionService.isTokenActive(verifiedUser.id, verifiedUser.session);
                }
                if (!isSessionActive) {
                    return Promise.reject(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.EXPIRED));
                }
                if (verifiedUser.type === constants_1.UserType.Admin) {
                    // console.log(adminService);
                    // verifiedUser.role = await adminService.getRoleForSession(verifiedUser.id);
                    return verifiedUser;
                }
                return verifiedUser;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * @description A function to generate auth token while logging in.
     * @param payload A payload data which will be stored in jwt.
     * @param userType A user type for which token will be generated (secrets are different for different type of users)
     * @param expiresIn A time in which jwt will be expired
     */
    generateAuthToken(payload, userType, expiresIn) {
        logger_util_1.Console.info('aaaa', userType);
        const { authToken } = env_util_1.environment.secrets[userType];
        const options = {};
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        return (0, jsonwebtoken_1.sign)(payload, authToken, options);
    }
    /**
     * @description A function to generate token which will be used to send over email to reset password.
     * @param payload A payload data which will be stored in jwt.
     * @param userType A user type for which token will be generated (secrets are different for different type of users)
     * @param expiresIn A time in which jwt will be expired
     */
    generatePwdMailToken(payload, userType, expiresIn) {
        const { passwordMailToken } = env_util_1.environment.secrets[userType];
        const options = {};
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        return (0, jsonwebtoken_1.sign)(payload, passwordMailToken, options);
    }
    /**
     * @description A method to verify auth token and extract data from it.
     * @param {string} token A token to be verified
     * @param {VerifyOptions} options options used while verifying token.
     */
    verifyAuthToken(token, userType, options) {
        const { authToken } = env_util_1.environment.secrets[userType];
        return (0, jsonwebtoken_1.verify)(token, authToken, options);
    }
    /**
     * @description A method to verify auth token and extract data from it.
     * @param {string} token A token to be verified
     * @param {VerifyOptions} options options used while verifying token.
     */
    verifyPwdMailToken(token, userType, options) {
        const { passwordMailToken } = env_util_1.environment.secrets[userType.toLowerCase()];
        return (0, jsonwebtoken_1.verify)(token, passwordMailToken);
    }
    /**
     * @description A function to generate unique id string with the help of uuid node module
     * @returns {string} A unique id string
     */
    generateId() {
        return uuid();
    }
    // async  isActive(sessionId: any): Promise<void> {
    // 	const data = await SessionModel.findOne({ _id: sessionId });
    // 	if (!data || !data.isActive) {
    // 		return Promise.reject(new ResponseError(400, 'sesssion expired'));
    // 	}
    // }
    expireToken(token, userType) {
        expiredTokens.set(token === null || token === void 0 ? void 0 : token.replace('Bearer ', ''), userType);
    }
}
exports.tokenUtil = new TokenUtil();
