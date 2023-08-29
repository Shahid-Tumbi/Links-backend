
export const ACCOUNT = {
	CREATED: 'Account created successfully.',
	DETAILS: 'Account details fetch successful.',
	NOT_FOUND: 'Account does not exists.',
	BLOCKED: 'Account is blocked',
};

export const LOGIN = {
	FAILED: 'Invalid credentials.',
	SUCCESS: 'Logined Successfully.',
};

export const ERROR = {
	INTERNAL: 'Internal server error.',
	ACCESS_FORBIDDEN: 'Not authorized to access.',
};

export const AUTHORIZATION = {
	VALID: 'Authorization is verified.',
	EXPIRED: 'Authorization is expired.',
	INVALID: 'Authorization is not valid',
	REQUIRED: 'Authorization is required',
	NO_ACCESS: 'You are not authorized to access',
	INVALID_MEHTOD: 'Invalid authorization method',
};

export enum LangCode {
	English = 'EN',
	Spanish = 'ES',
	Madarin = 'ZH_HANT',
	Chinese_Simplified = 'ZH_HANS',
}
export enum GRAPH_TYPE {
	WEEKLY = '1',
	MONTHLY = '2',
	YEARLY = '3',
	HOURS = '4',
}

export const MONTHS = [
	{ index: 1, day: 31, week: 5 },
	{ index: 2, day: 28, week: 4 },
	{ index: 3, day: 31, week: 5 },
	{ index: 4, day: 30, week: 5 },
	{ index: 5, day: 31, week: 5 },
	{ index: 6, day: 30, week: 5 },
	{ index: 7, day: 31, week: 5 },
	{ index: 8, day: 31, week: 5 },
	{ index: 9, day: 30, week: 5 },
	{ index: 10, day: 31, week: 5 },
	{ index: 11, day: 30, week: 5 },
	{ index: 12, day: 31, week: 5 },
];

export const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const DAYS = [
	'Sun',
	'Mon',
	'Tues',
	'Wed',
	'Thur',
	'Fri',
	'Sat',
];

export enum COUNTDOWN_RECURSIVE_STATUS {
	// 'DO_NOT_REPEAT' = '1',
	'DAILY' = '2',
	'REPEAT_WEEKDAYS' = '3',
}
