import { createLogger, transports, format } from 'winston';

/**
 * @author Shahid Tumbi
 * @description A database logger which logs in console and log file (database.log).
 */
export const DbLogger = createLogger({
	level: 'info',
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({
					level: true,
					message: true,
				}),
				format.printf((info: any) => {
					return `[${info.level}] ${info.message}`;
				}),
			),
		}),
		new transports.File({
			filename: 'database.log',
			format: format.printf((info) => {
				return JSON.stringify(info);
			}),
		}),
	],
});

/**
 * @author Shahid Tumbi
 * @description A console logger which logs in console with formated text.
 */
export const Console = createLogger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({
					level: true,
					message: true,
				}),
				format.printf((info: any) => {
					return `<${info.level}> ${info.message}`;
				}),
			),
			level: '',
		}),
	],
});
