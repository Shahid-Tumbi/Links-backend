import { join } from 'path';
import { Console } from './logger.util';
import { readFileSync } from 'fs';
const dotenv = require('dotenv');
dotenv.config({ path:'.env' });

/**
 * @description A utility function to load environment config variables.
 * @param {string} env name of environment config file inside the environments directory.
 */
export const environment = ((env: 'development' | 'testing' | 'staging' | 'local' | 'production') => {
	Console.info('Environment Configuration Started : ' + env);
	const envPath = join(process.cwd(), 'environments', `${env}.json`);
	try {
		const configData = readFileSync(envPath, {
			encoding: 'UTF-8',
		});
		const config = JSON.parse(configData);
		Object.defineProperty(config, 'isLocal', {
			get(): boolean {
				return config.name === 'local';
			},
		});
		Object.defineProperty(config, 'isDev', {
			get(): boolean {
				return config.name === 'development';
			},
		});
		return config;
	} catch (err) {
		Console.error('>> Environment Load Error');
		Console.error(err.message);
		process.exit(0);
	}
})(process.env.NODE_ENV as any);
