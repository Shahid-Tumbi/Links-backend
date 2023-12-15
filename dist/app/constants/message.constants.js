"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COUNTDOWN_RECURSIVE_STATUS = exports.DAYS = exports.MONTH_NAME = exports.MONTHS = exports.GRAPH_TYPE = exports.LangCode = exports.AUTHORIZATION = exports.ERROR = exports.LOGIN = exports.ACCOUNT = void 0;
exports.ACCOUNT = {
    CREATED: 'Account created successfully.',
    DETAILS: 'Account details fetch successful.',
    NOT_FOUND: 'Account does not exists.',
    BLOCKED: 'Account is blocked',
};
exports.LOGIN = {
    FAILED: 'Invalid credentials.',
    SUCCESS: 'Logined Successfully.',
};
exports.ERROR = {
    INTERNAL: 'Internal server error.',
    ACCESS_FORBIDDEN: 'Not authorized to access.',
};
exports.AUTHORIZATION = {
    VALID: 'Authorization is verified.',
    EXPIRED: 'Authorization is expired.',
    INVALID: 'Authorization is not valid',
    REQUIRED: 'Authorization is required',
    NO_ACCESS: 'You are not authorized to access',
    INVALID_MEHTOD: 'Invalid authorization method',
};
var LangCode;
(function (LangCode) {
    LangCode["English"] = "EN";
    LangCode["Spanish"] = "ES";
    LangCode["Madarin"] = "ZH_HANT";
    LangCode["Chinese_Simplified"] = "ZH_HANS";
})(LangCode = exports.LangCode || (exports.LangCode = {}));
var GRAPH_TYPE;
(function (GRAPH_TYPE) {
    GRAPH_TYPE["WEEKLY"] = "1";
    GRAPH_TYPE["MONTHLY"] = "2";
    GRAPH_TYPE["YEARLY"] = "3";
    GRAPH_TYPE["HOURS"] = "4";
})(GRAPH_TYPE = exports.GRAPH_TYPE || (exports.GRAPH_TYPE = {}));
exports.MONTHS = [
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
exports.MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
exports.DAYS = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
];
var COUNTDOWN_RECURSIVE_STATUS;
(function (COUNTDOWN_RECURSIVE_STATUS) {
    // 'DO_NOT_REPEAT' = '1',
    COUNTDOWN_RECURSIVE_STATUS["DAILY"] = "2";
    COUNTDOWN_RECURSIVE_STATUS["REPEAT_WEEKDAYS"] = "3";
})(COUNTDOWN_RECURSIVE_STATUS = exports.COUNTDOWN_RECURSIVE_STATUS || (exports.COUNTDOWN_RECURSIVE_STATUS = {}));
