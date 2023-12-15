"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidURL = exports.generateFromEmail = exports.getRoomIdFromUserIds = exports.callbackWrapper = exports.getCdnUrl = exports.getWidthAndHightOfImage = exports.currentUTC = exports.asyncForEach = exports.defineMessage = exports.getLastMonthDays = exports.getLastWeekDays = exports.getReadingTime = exports.convertDateToTimestamp = exports.isEmpty = exports.randomNumberStringGenerator = exports.randomStringGenerator = void 0;
const url = require("url");
const https = require("https");
const image_size_1 = require("image-size");
const env_util_1 = require("./env.util");
const api_constants_1 = require("../app/api/api.constants");
// import { imageSize } from 'image-size';
const randomStringGenerator = (val) => {
    let str = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // Random number generator to create accessToken
    for (let i = 0; i < val; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
};
exports.randomStringGenerator = randomStringGenerator;
const randomNumberStringGenerator = (val) => {
    let str = '';
    const possible = '0123456789';
    // Random number generator to create accessToken
    for (let i = 0; i < val; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
};
exports.randomNumberStringGenerator = randomNumberStringGenerator;
const isEmpty = (dataSet) => {
    if (Array.isArray(dataSet)) {
        return !Boolean(dataSet.length);
    }
    if (typeof dataSet === 'object') {
        return !Boolean(Object.keys(dataSet).length);
    }
    return !Boolean(dataSet.length);
};
exports.isEmpty = isEmpty;
// tslint:disable-next-line: no-shadowed-variable
const convertDateToTimestamp = (date = new Date()) => {
    return date ? +new Date(date) : +new Date();
};
exports.convertDateToTimestamp = convertDateToTimestamp;
const getReadingTime = (text = '') => {
    const { AVG_WORD_PER_MIN: avgWordsPerMin } = api_constants_1.CONSTANT.BLOG;
    let count = getWordCount(text);
    let time = Math.ceil(count / avgWordsPerMin);
    return time;
};
exports.getReadingTime = getReadingTime;
const getWordCount = (text) => {
    return text.match(/\w+/g).length;
};
const getLastWeekDays = () => {
    const milli_in_a_day = 86400000;
    const now = new Date();
    const startDay = 1; // 0=sunday, 1=monday etc.
    const d = now.getDay(); // get the current day
    // rewind to start day
    const last_week_start_date = new Date(now.valueOf() - (milli_in_a_day * (7 + ((d <= 0 ? 7 - startDay : d - startDay)))));
    // add 6 days to get last day
    const last_week_end_date = new Date(last_week_start_date.valueOf() + (6 * milli_in_a_day));
    return { last_week_start_date, last_week_end_date };
};
exports.getLastWeekDays = getLastWeekDays;
// tslint:disable-next-line: no-shadowed-variable
const getLastMonthDays = (date) => {
    const last_month_start_date = date || new Date();
    last_month_start_date.setDate(1);
    last_month_start_date.setMonth(last_month_start_date.getMonth() - 1);
    const cur_date = date || new Date();
    const last_month_end_date = +new Date(cur_date.getFullYear(), cur_date.getMonth());
    return {
        last_month_start_date: +new Date(last_month_start_date),
        last_month_end_date,
    };
};
exports.getLastMonthDays = getLastMonthDays;
/**
 * @description a function to define multiple language messages text
 * @param {string} EN message text in English language
 * @param {string} ES message text in Spanish language
 * @param {string} ZH_HANS message text in Chinese Simplified language
 * @param {string} ZH_HANT message text in Madarin language
 */
function defineMessage(EN = '', ES = '', ZH_HANS = '', ZH_HANT = '') {
    return { EN, ES, ZH_HANS, ZH_HANT };
}
exports.defineMessage = defineMessage;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
exports.asyncForEach = asyncForEach;
/**
 * @description A function to generate current UTC timestamp
 */
function currentUTC() {
    const d = new Date();
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
}
exports.currentUTC = currentUTC;
/**
 * @description Get image width and height
 */
function getWidthAndHightOfImage(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgUrl = path;
        const options = yield url.parse(imgUrl);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            return https.get(options, (response) => __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                return response.on('data', (chunk) => {
                    chunks.push(chunk);
                }).on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const buffer = Buffer.concat(chunks);
                    resolve((0, image_size_1.imageSize)(buffer));
                }));
            }));
        }));
    });
}
exports.getWidthAndHightOfImage = getWidthAndHightOfImage;
/**
 * @description Get CDN url
 */
function getCdnUrl(url) {
    if (url && env_util_1.environment.aws && env_util_1.environment.aws.credentials && env_util_1.environment.aws.credentials.cognitoId) {
        const origVideoArr = url.split('/');
        origVideoArr[2] = env_util_1.environment.aws.credentials.cognitoId;
        const newMediaUrl = origVideoArr.join('/');
        return newMediaUrl;
    }
    else {
        return url;
    }
}
exports.getCdnUrl = getCdnUrl;
function callbackWrapper(emitAck, data) {
    if (!emitAck || typeof emitAck !== 'function') {
        return;
    }
    return emitAck(data);
}
exports.callbackWrapper = callbackWrapper;
/**
 * This function returns local_room_id as concatenated strings of user_id sorted in desc order
 * @param array [user1, user2]
 * @returns user1.user2
 */
function getRoomIdFromUserIds(array = []) {
    array.sort();
    return array.reverse().join('.');
}
exports.getRoomIdFromUserIds = getRoomIdFromUserIds;
function generateFromEmail(email, randomDigits) {
    const nameParts = email.replace(/@.+/, "");
    const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
    return name + (0, exports.randomNumberStringGenerator)(randomDigits);
}
exports.generateFromEmail = generateFromEmail;
function isValidURL(string) {
    try {
        new url.URL(string);
        return true;
    }
    catch (_) {
        return false;
    }
}
exports.isValidURL = isValidURL;
