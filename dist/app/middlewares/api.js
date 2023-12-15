"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiMiddleware = void 0;
const utils_1 = require("../../utils");
const constants_1 = require("../constants");
function apiMiddleware(req, res, next) {
    utils_1.Console.info('Api Middleware');
    res.success = function (messages, result = null, { status: statusCode = 200, meta, } = {}) {
        const { language = constants_1.LangCode.English } = req.client;
        const message = messages[language] || messages || 'Success';
        this.status(statusCode === 204 ? 200 : statusCode).json({ statusCode, message, result, meta });
    };
    res.error = function ({ status: statusCode = 500, messages, message: msg, errorCode, }) {
        const { language = constants_1.LangCode.English } = req.client;
        const message = messages && messages[language] || msg || `Oops! we couldn't process your request, please try again later!`;
        this.status(statusCode).json({ statusCode, message, result: null, errorCode });
    };
    try {
        req.client = {
            language: Object.values(constants_1.LangCode).find((lang) => {
                return req.acceptsLanguages().some((val) => new RegExp(lang, 'i').test(val));
            }) || constants_1.LangCode.English,
        };
        const deviceHeaders = {
            deviceId: 'Device-Id',
            deviceType: 'Device-Type',
            deviceModel: 'Device-Model',
            ipAddress: 'IP-Address',
        };
        Object.entries(deviceHeaders).forEach(([key, headerName]) => {
            const headerValue = req.header(headerName);
            req.client[key] = headerValue;
        });
    }
    catch (error) {
        return next(error);
    }
    next();
}
exports.apiMiddleware = apiMiddleware;
