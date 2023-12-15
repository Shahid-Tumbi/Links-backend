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
exports.adminSession = exports.session = void 0;
const user_constants_1 = require("../constants/user.constants");
const error_util_1 = require("../../utils/error.util");
const constants_1 = require("../constants");
const utils_1 = require("../../utils");
//TODO add basic auth to environment
const BASIC_TOKEN = Buffer.from(`links:backend`).toString('base64');
function session(users) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new error_util_1.ResponseError(400, constants_1.AUTHORIZATION.REQUIRED));
        }
        const [type, token] = authorization.split(' ');
        if (!type || !token || !Object.values(constants_1.AUTH_TYPES).includes(type)) {
            return next(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.INVALID_MEHTOD));
        }
        if (type === constants_1.AUTH_TYPES.BASIC && token === BASIC_TOKEN) {
            // Basic Auth
            if (users.includes(user_constants_1.UserType.Default)) {
                return next();
            }
            return next(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.NO_ACCESS));
        }
        else if (type === constants_1.AUTH_TYPES.BEARER) {
            // Bearer Auth
            try {
                req.user = yield utils_1.tokenUtil.authorize(token, users);
                return next();
            }
            catch ({ name, message }) {
                // @TODO Error Message according to error name
                return next(new error_util_1.ResponseError(401, message));
            }
        }
        return next(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.INVALID));
    });
}
exports.session = session;
function adminSession(users) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new error_util_1.ResponseError(400, constants_1.AUTHORIZATION.REQUIRED));
        }
        const [type, token] = authorization.split(' ');
        if (!type || !token || !Object.values(constants_1.AUTH_TYPES).includes(type)) {
            return next(new error_util_1.ResponseError(400, constants_1.AUTHORIZATION.INVALID_MEHTOD));
        }
        if (type === constants_1.AUTH_TYPES.BASIC && token === BASIC_TOKEN) {
            // Basic Auth
            if (users.includes(user_constants_1.UserType.Default)) {
                return next();
            }
            return next(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.NO_ACCESS));
        }
        else if (type === constants_1.AUTH_TYPES.BEARER) {
            // Bearer Auth
            try {
                req.user = yield utils_1.tokenUtil.authorize(token, users);
                return next();
            }
            catch ({ name, message }) {
                // @TODO Error Message according to error name
                return next(new error_util_1.ResponseError(401, message));
            }
        }
        return next(new error_util_1.ResponseError(401, constants_1.AUTHORIZATION.INVALID));
    });
}
exports.adminSession = adminSession;
