import { Request } from 'express';
import { appendFile, PathLike } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { sendEmailMailer } from './emailer';
import { environment } from './env.util';

export class ApiDebugger {
	readonly fileName = 'errors.log';
	readonly filePath: PathLike = resolve(process.cwd(), this.fileName);
	async log(req: Request, error: Error): Promise<void> {
		const data = {
			message: error.message,
			...this.extractData(req),
			date: new Date().toISOString(),
		};
		console.error('-----------------------------------------------Start Error-----------------------------------------------');
		console.error(data, error);
		console.error('----------------------------------------------- End Error -----------------------------------------------');
		await promisify(appendFile)(this.filePath, JSON.stringify(data) + '\n');
		if (error.name !== 'ResponseError' && !environment.isLocal && !environment.isDev) {
			// send email to look into
			const body = {
				subject: `WTF Club Social Error: ${error.message}`,
				text: JSON.stringify(data),
				html: ''
			};
			await sendEmailMailer({
				to: 'dev@nksqr.com',
				...body,
			});
			await sendEmailMailer({
				to: 'dev@nksqr.com',
				...body,
			});
		}
	}
	extractData(req: Request) {
		return {
			headers: req.headers,
			path: req.path,
			body: req.body,
			query: req.query,
			params: req.params,
			user: (req as any).user,
		};
	}
}

export const apiDebugger = new ApiDebugger();
