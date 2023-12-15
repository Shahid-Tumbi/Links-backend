"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_EXPIRE_TIME = exports.AUTH_TYPES = exports.SESSION_AGE = void 0;
/**
 * @constant SESSION_AGE
 * @description It is a time in seconds in which auth token will
 * expire and user has to refresh token with the help of refresh
 * token provided at the time of login.
 */
exports.SESSION_AGE = 1 * 12 * 30 * 24 * 60 * 60;
exports.AUTH_TYPES = {
    BASIC: 'Basic',
    BEARER: 'Bearer',
};
/**
 * @constant OTP_EXPIRE_TIME
 * @description A Time after which otp token will be expired
 * @example 60 seconds
 */
exports.OTP_EXPIRE_TIME = 60;
