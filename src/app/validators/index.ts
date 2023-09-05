import * as Joi from 'joi';
import { CONSTANT } from '@api/api.constants';
import { DeviceType, UserGender } from '../constants';
import Grapheme = require('grapheme-splitter');

enum messageType {
	phone_number = '1',
	user_name = '2',
	email = '3',
	hashtag = '4',
}

export const JLength = {
	length(value: string) {
		const length = new Grapheme().countGraphemes(value);
		// tslint:disable-next-line: no-console
		console.info(length);
		return length;
	},
	min(length: number): Joi.CustomValidator {
		return (value: string, helpers: Joi.CustomHelpers): string | Joi.ErrorReport => {
			if (this.length(value) < length) {
				return helpers.error('string.min');
			}
			return value;
		};
	},
	max(length: number): Joi.CustomValidator {
		return (value: string, helpers: Joi.CustomHelpers): string | Joi.ErrorReport => {
			if (this.length(value) > length) {
				return helpers.error('string.max');
			}
			return value;
		};
	},
};

function errorMessages(err: any, whichType: { type: string, value: string; }) {
	const text = whichType.value;
	switch (err.type) {
		case 'any.empty':
			err.message = `${text} should not be empty!`;
			break;
		case 'string.min':
			err.message = `${text} should have at least ${err.context.limit} digits!`;
			break;
		case 'string.max':
			err.message = `${text} should have at most ${err.context.limit} digits!`;
			break;
		case 'string.regex.base':
			if (whichType.type === messageType.phone_number) {
				err.message = `${text} can not start with 0 / contain alphabets`;
				// tslint:disable-next-line: max-line-length
			} else if (whichType.type === messageType.user_name || whichType.type === messageType.email || whichType.type === messageType.hashtag) {
				err.message = `${text} is not in correct format`;
			}
			break;
		default:
			err.message = `${text} is not in correct format`;
			break;
	}
}
export const JMessages = {
	stringDigits: (errors: any) => {
		errors.forEach((err: any) => {
			const object = { type: messageType.phone_number, value: 'Phone number' };
			errorMessages(err, object);
		});
		return errors;
	},
	userNameError: (errors: any) => {
		errors.forEach((err: any) => {
			const object = { type: messageType.user_name, value: 'Username' };
			errorMessages(err, object);
		});
		return errors;
	},
	emailError: (errors: any) => {
		errors.forEach((err: any) => {
			const object = { type: messageType.email, value: 'Email' };
			errorMessages(err, object);
		});
		return errors;
	},
	hashtagError: (errors: any) => {
		errors.forEach((err: any) => {
			const object = { type: messageType.hashtag, value: 'Hashtag' };
			errorMessages(err, object);
		});
		return errors;
	},
};
export const JNumber = Joi.number();
export const JLat = JNumber.min(-90).max(90);
export const JLong = JNumber.min(-180).max(180);
export const JString = Joi.string().trim();
export const JName = JString.custom(JLength.min(3)).custom(JLength.max(25));
export const JArray = Joi.array().items(JString.required()).unique();
export const JNumberArray = Joi.array().items(JNumber.required()).unique();
export const JDate = JString.isoDate();
export const JStartDate = JDate;
export const JOtp = JString.min(4).max(4).regex(/^\d*$/);
export const JEmail = JString.lowercase().regex(CONSTANT.REGEX.EMAIL);
export const JMobile = JString.min(4).max(14).regex(/^[1-9][0-9]{3,14}$/);
export const JDialCode = JString.max(10).replace(/^\+?/, '+');
export const JPassword = JString.regex(CONSTANT.REGEX.PASSWORD);
export const JID = JString.length(24);
export const JUserName = JString.min(7).max(30).regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/);
export const JDeviceType = JString.valid(DeviceType.ANDROID, DeviceType.IOS);
export const JToken = JString;
export const JUrl = JString.uri({ allowRelative: true });
export const JGender = JString.valid(...Object.values(UserGender));
export const JFullName = Joi.object({
	first: JName.required(),
	middle: JName,
	last: JName.required(),
});
export const JQuery = Joi.object({});
export const JUUID1 = JString.guid({ version: 'uuidv1' });
export const JLocationObject = Joi.object({
	coordinates:JNumberArray.optional(),
	maxDistance:JNumber.optional(),
	minDistance:JNumber.optional()
})
export const JList = Joi.object({
	page: JNumber.default(1),
	limit: JNumber.default(25).max(100),
	search: JString,
	sort_by: JString,
	sort_order: JString.valid('asc', 'desc', '1', '-1').default('desc'),
});

export const JPoint = Joi.object({
	type: JString.allow('Point').default('Point'),
	coordinates: Joi.array().items(JLong.default(0), JLat.default(0)),
}).optional();

export const JLocation = Joi.object({
	city: JString.allow('', null),
	region: JString.allow('', null),
	country: JString,
	fullAddr: JString,
}).optional();

export const JLang = JString.min(2).max(3);
export const JBoolean = Joi.bool().valid('true', 'false', true, false);

export const JComment = Joi.object({
	text: JString.required(),
	mentions: Joi.array().items({
		id: JUUID1.required(),
		profile_url: JString.allow(null, ''),
		user_name: JUserName.required(),
		name: JName.required(),
		pets: Joi.object({
			id: JUUID1.required(),
			name: JName.required(),
			profile_url: JString.allow(null, ''),
		}),
		start_pos: JNumber.allow(null, ''),
	}),
	hashtags: Joi.array().items(Joi.object({
		name: JString.max(50).regex(CONSTANT.REGEX.HASHTAG).required(),
		id: JString,
		start_pos: JNumber,
	})),
});
