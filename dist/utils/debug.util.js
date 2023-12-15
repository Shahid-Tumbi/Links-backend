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
exports.apiDebugger = exports.ApiDebugger = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const emailer_1 = require("./emailer");
const env_util_1 = require("./env.util");
class ApiDebugger {
    constructor() {
        this.fileName = 'errors.log';
        this.filePath = (0, path_1.resolve)(process.cwd(), this.fileName);
    }
    log(req, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({ message: error.message }, this.extractData(req)), { date: new Date().toISOString() });
            console.error('-----------------------------------------------Start Error-----------------------------------------------');
            console.error(data, error);
            console.error('----------------------------------------------- End Error -----------------------------------------------');
            yield (0, util_1.promisify)(fs_1.appendFile)(this.filePath, JSON.stringify(data) + '\n');
            if (error.name !== 'ResponseError' && !env_util_1.environment.isLocal && !env_util_1.environment.isDev) {
                // send email to look into
                const body = {
                    subject: `Links Social Error: ${error.message}`,
                    text: JSON.stringify(data),
                    html: ''
                };
                yield (0, emailer_1.sendEmailMailer)(Object.assign({ to: 'dev@nksqr.com' }, body));
                yield (0, emailer_1.sendEmailMailer)(Object.assign({ to: 'dev@nksqr.com' }, body));
            }
        });
    }
    extractData(req) {
        return {
            headers: req.headers,
            path: req.path,
            body: req.body,
            query: req.query,
            params: req.params,
            user: req.user,
        };
    }
}
exports.ApiDebugger = ApiDebugger;
exports.apiDebugger = new ApiDebugger();
