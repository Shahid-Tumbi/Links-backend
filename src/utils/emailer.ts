import { environment } from './env.util';
import { Console } from './logger.util';
import * as nodemailer from 'nodemailer';
export const sendEmailMailer = async (payload: any) => {
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
				user: environment.GMAIL_ACCOUNT,
				pass: environment.GMAIL_PASS,
			},
		});

		// send mail with defined transport object
		const from = environment.GMAIL_ACCOUNT;
		const info = await transporter.sendMail({
			from, // sender address
			to: payload.to, // list of receivers
			subject: payload.subject, // Subject line
			text: payload.text, // plain text body
			html: payload.html || '', // html body
			attachments: payload.attachments || [],
		});

		Console.info('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (error) {
		return Promise.reject(error);
	}
};
