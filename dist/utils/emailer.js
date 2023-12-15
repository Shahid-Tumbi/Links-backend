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
exports.sendEmailMailer = void 0;
const env_util_1 = require("./env.util");
const logger_util_1 = require("./logger.util");
const nodemailer = require("nodemailer");
const sendEmailMailer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            // port: 587,
            // sendmail: true,
            service: 'gmail',
            // secure: false, // true for 465, false for other ports
            auth: {
                user: env_util_1.environment.GMAIL_ACCOUNT,
                pass: env_util_1.environment.GMAIL_PASS,
            },
        });
        // send mail with defined transport object
        const from = env_util_1.environment.GMAIL_ACCOUNT;
        const info = yield transporter.sendMail({
            from,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
            html: payload.html || '',
            attachments: payload.attachments || [],
        });
        logger_util_1.Console.info('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.sendEmailMailer = sendEmailMailer;
