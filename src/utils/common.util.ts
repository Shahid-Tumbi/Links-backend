import * as url from 'url';
import * as https from 'https';
import { imageSize } from 'image-size';
import { environment } from './env.util';
import { CONSTANT } from '@api/api.constants';

// import { imageSize } from 'image-size';
export const randomStringGenerator = (val: number) => {
	let str = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	// Random number generator to create accessToken
	for (let i = 0; i < val; i++) {
		str += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return str;
};

export const randomNumberStringGenerator = (val: number) => {
	let str = '';
	const possible = '0123456789';
	// Random number generator to create accessToken
	for (let i = 0; i < val; i++) {
		str += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return str;
};

export const isEmpty = (dataSet: any) => {
	if (Array.isArray(dataSet)) {
		return !Boolean(dataSet.length);
	}
	if (typeof dataSet === 'object') {
		return !Boolean(Object.keys(dataSet).length);
	}
	return !Boolean(dataSet.length);
};

// tslint:disable-next-line: no-shadowed-variable
export const convertDateToTimestamp = (date: Date = new Date()) => {
	return date ? +new Date(date) : +new Date();
};

export const getReadingTime = (text: string = '') => {
	const { AVG_WORD_PER_MIN: avgWordsPerMin } = CONSTANT.BLOG;
	let count = getWordCount(text);
	let time = Math.ceil(count / avgWordsPerMin);
	return time;
};

const getWordCount = (text: string) => {
	return text.match(/\w+/g).length;
};

export const getLastWeekDays = () => {
	const milli_in_a_day = 86400000;
	const now = new Date();
	const startDay = 1; // 0=sunday, 1=monday etc.
	const d = now.getDay(); // get the current day

	// rewind to start day
	const last_week_start_date = new Date(
		now.valueOf() - (
			milli_in_a_day * (7 + ((d <= 0 ? 7 - startDay : d - startDay)))
		),
	);

	// add 6 days to get last day
	const last_week_end_date = new Date(
		last_week_start_date.valueOf() + (6 * milli_in_a_day),
	);
	return { last_week_start_date, last_week_end_date };
};

// tslint:disable-next-line: no-shadowed-variable
export const getLastMonthDays = (date?: Date) => {
	const last_month_start_date = date || new Date();
	last_month_start_date.setDate(1);
	last_month_start_date.setMonth(last_month_start_date.getMonth() - 1);
	const cur_date = date || new Date();
	const last_month_end_date = +new Date(
		cur_date.getFullYear(),
		cur_date.getMonth(),
	);
	return {
		last_month_start_date: +new Date(last_month_start_date),
		last_month_end_date,
	};
};

/**
 * @description a function to define multiple language messages text
 * @param {string} EN message text in English language
 * @param {string} ES message text in Spanish language
 * @param {string} ZH_HANS message text in Chinese Simplified language
 * @param {string} ZH_HANT message text in Madarin language
 */
export function defineMessage(EN: string = '', ES: string = '', ZH_HANS: string = '', ZH_HANT: string = '') {
	return { EN, ES, ZH_HANS, ZH_HANT };
}

export async function asyncForEach(array: any, callback: any) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

/**
 * @description A function to generate current UTC timestamp
 */
export function currentUTC(): number {
	const d = new Date();
	return Date.UTC(
		d.getUTCFullYear(),
		d.getUTCMonth(),
		d.getUTCDate(),
		d.getUTCHours(),
		d.getUTCMinutes(),
		d.getUTCSeconds(),
		d.getUTCMilliseconds(),
	);
}

/**
 * @description Get image width and height
 */
export async function getWidthAndHightOfImage(path: string): Promise<any> {
	const imgUrl = path;
	const options = await url.parse(imgUrl);
	return new Promise(async (resolve) => {
		return https.get(options, async (response: any) => {
			const chunks: any = [];
			return response.on('data', (chunk: any) => {
				chunks.push(chunk);
			}).on('end', async () => {
				const buffer = Buffer.concat(chunks);
				resolve(imageSize(buffer));
			});
		});
	});
}
/**
 * @description Get CDN url
 */
export function getCdnUrl(url: string) {
	if (url && environment.aws && environment.aws.credentials && environment.aws.credentials.cognitoId) {
		const origVideoArr = url.split('/');
		origVideoArr[2] = environment.aws.credentials.cognitoId;
		const newMediaUrl = origVideoArr.join('/');
		return newMediaUrl;
	} else {
		return url;
	}
}

export function callbackWrapper(emitAck: any, data: any) {
	if (!emitAck || typeof emitAck !== 'function') {
		return;
	}
	return emitAck(data);
}
/**
 * This function returns local_room_id as concatenated strings of user_id sorted in desc order
 * @param array [user1, user2]
 * @returns user1.user2
 */
export function getRoomIdFromUserIds(array = [] as string[]) {
	array.sort();
	return array.reverse().join('.');
}
