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
const nodemailer = require('nodemailer');
const fs = require('fs');
const user_constants_1 = require("../app/api/user/user.constants");
const path = require("path");
const sendEmail = (email, name, sentLink, welcomeEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlRAW = fs.readFileSync(path.join(__dirname, "../../public/templates/welcome.html"), "utf8");
    const ForgetHtml = fs.readFileSync(path.join(__dirname, "../../public/templates/forgot-password.html"), "utf8");
    // const parsedHtml = parse(htmlRAW);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user_constants_1.GMAIL_SERVICE.EMAIL_USER,
            pass: user_constants_1.GMAIL_SERVICE.EMAIL_PASS
        }
    });
    let message = {};
    if (welcomeEmail === true) {
        let data = htmlRAW.replace('[userName]', name);
        message = {
            from: user_constants_1.GMAIL_SERVICE.EMAIL_USER,
            to: email,
            subject: user_constants_1.GMAIL_SERVICE.WELCOME_SUBJECT,
            html: data,
        };
    }
    else {
        let data = ForgetHtml.replace(/\$\{sentLink\}/g, sentLink);
        message = {
            from: user_constants_1.GMAIL_SERVICE.EMAIL_USER,
            to: email,
            subject: user_constants_1.GMAIL_SERVICE.SUBJECT,
            html: data,
        };
    }
    yield transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
            return info;
        }
    });
});
exports.default = sendEmail;
