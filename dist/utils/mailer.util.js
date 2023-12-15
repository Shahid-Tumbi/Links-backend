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
exports.mailer = void 0;
const nodemailer_1 = require("nodemailer");
const path_1 = require("path");
const ejs_1 = require("ejs");
const logger_util_1 = require("./logger.util");
const env_util_1 = require("./env.util");
class Mailer {
    constructor() {
        this.transporter = null;
        this.account = null;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_util_1.Console.info('Initializing Mailer');
                this.transporter = (0, nodemailer_1.createTransport)({
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    host: 'smtp.gmail.com',
                    auth: env_util_1.environment.mailer.auth,
                    service: 'gmail',
                });
                logger_util_1.Console.info('Mailer Intialized Successfully');
            }
            catch (err) {
                logger_util_1.Console.error('Mailer failed because ' + err.message);
            }
            // this.
        });
    }
    /**
     * @description A function to send mails with provided templates and data
     * @param name template name (filename without extension)
     * @param to receiver email address
     * @param data data to be rendered in template
     */
    sendMail(name, to, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                from: env_util_1.environment.mailer.from,
                html: yield this.genTemplate(`${name}.html`, data),
                subject: 'Forgot Password: Links App',
                to,
            };
            const info = yield this.transporter.sendMail(options);
            logger_util_1.Console.info(info);
            return;
        });
    }
    /**
     * @description A function to read template file and render it with data
     * @param file template file name (with extension)
     * @param data data to render in template
     */
    genTemplate(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatePath = (0, path_1.join)(process.cwd(), 'public/templates', file);
            const templateHtml = yield (0, ejs_1.renderFile)(templatePath, data, {});
            return templateHtml;
        });
    }
}
exports.mailer = new Mailer();
