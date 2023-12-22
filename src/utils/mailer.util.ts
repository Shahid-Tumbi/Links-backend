
import { createTransport, TestAccount, Transporter } from 'nodemailer';
import { join } from 'path';
import { renderFile, Data } from 'ejs';
import { Console } from './logger.util';
import { environment } from './env.util';

class Mailer {
	transporter: Transporter = null;
	account: TestAccount = null;
	async init(): Promise<void> {
		try {
			Console.info('Initializing Mailer');
			this.transporter = createTransport({
				port: 587,
				secure: false,
				requireTLS: true,
				host: 'smtp.gmail.com',
				auth: environment.mailer.auth,
				service: 'gmail',
			});
			Console.info('Mailer Intialized Successfully');
		} catch (err) {
			Console.error('Mailer failed because ' + err.message);
		}
		// this.
	}
	/**
	 * @description A function to send mails with provided templates and data
	 * @param name template name (filename without extension)
	 * @param to receiver email address
	 * @param data data to be rendered in template
	 */
	async sendMail(name: string, to: string, data: any = {}): Promise<void> {
		const options = {
			from: environment.mailer.from,
			html: await this.genTemplate(`${name}.html`, data),
			subject: 'Forgot Password: WTF Club App',
			to,
		};
		const info = await this.transporter.sendMail(options);
		Console.info(info);
		return;
	}
	/**
	 * @description A function to read template file and render it with data
	 * @param file template file name (with extension)
	 * @param data data to render in template
	 */
	async genTemplate(file: string, data: Data): Promise<string> {
		const templatePath = join(process.cwd(), 'public/templates', file);
		const templateHtml = await renderFile(templatePath, data, {});
		return templateHtml as string;
	}
}

export const mailer = new Mailer();
