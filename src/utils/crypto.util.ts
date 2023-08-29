import { createHmac } from 'crypto';
import { environment } from './env.util';

export const hashPassword = (text: any) => {
	return new Promise((resolve, reject) => {
		const hash = createHmac('sha256', environment.salt);
		hash.update(text.toString());
		resolve(hash.digest('hex'));
	});
};
