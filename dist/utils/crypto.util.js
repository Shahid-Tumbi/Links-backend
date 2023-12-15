"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const crypto_1 = require("crypto");
const env_util_1 = require("./env.util");
const hashPassword = (text) => {
    return new Promise((resolve, reject) => {
        const hash = (0, crypto_1.createHmac)('sha256', env_util_1.environment.salt);
        hash.update(text.toString());
        resolve(hash.digest('hex'));
    });
};
exports.hashPassword = hashPassword;
