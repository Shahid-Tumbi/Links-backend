"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JComment = exports.JBoolean = exports.JLang = exports.JLocation = exports.JPoint = exports.JList = exports.JLocationObject = exports.JUUID1 = exports.JQuery = exports.JFullName = exports.JGender = exports.JUrl = exports.JToken = exports.JDeviceType = exports.JUserName = exports.JID = exports.JPassword = exports.JDialCode = exports.JMobile = exports.JEmail = exports.JOtp = exports.JStartDate = exports.JDate = exports.JNumberArray = exports.JArray = exports.JName = exports.JString = exports.JLong = exports.JLat = exports.JNumber = exports.JMessages = exports.JLength = void 0;
const Joi = require("joi");
const api_constants_1 = require("../api/api.constants");
const constants_1 = require("../constants");
const Grapheme = require("grapheme-splitter");
var messageType;
(function (messageType) {
    messageType["phone_number"] = "1";
    messageType["user_name"] = "2";
    messageType["email"] = "3";
    messageType["hashtag"] = "4";
})(messageType || (messageType = {}));
exports.JLength = {
    length(value) {
        const length = new Grapheme().countGraphemes(value);
        // tslint:disable-next-line: no-console
        console.info(length);
        return length;
    },
    min(length) {
        return (value, helpers) => {
            if (this.length(value) < length) {
                return helpers.error('string.min');
            }
            return value;
        };
    },
    max(length) {
        return (value, helpers) => {
            if (this.length(value) > length) {
                return helpers.error('string.max');
            }
            return value;
        };
    },
};
function errorMessages(err, whichType) {
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
            }
            else if (whichType.type === messageType.user_name || whichType.type === messageType.email || whichType.type === messageType.hashtag) {
                err.message = `${text} is not in correct format`;
            }
            break;
        default:
            err.message = `${text} is not in correct format`;
            break;
    }
}
exports.JMessages = {
    stringDigits: (errors) => {
        errors.forEach((err) => {
            const object = { type: messageType.phone_number, value: 'Phone number' };
            errorMessages(err, object);
        });
        return errors;
    },
    userNameError: (errors) => {
        errors.forEach((err) => {
            const object = { type: messageType.user_name, value: 'Username' };
            errorMessages(err, object);
        });
        return errors;
    },
    emailError: (errors) => {
        errors.forEach((err) => {
            const object = { type: messageType.email, value: 'Email' };
            errorMessages(err, object);
        });
        return errors;
    },
    hashtagError: (errors) => {
        errors.forEach((err) => {
            const object = { type: messageType.hashtag, value: 'Hashtag' };
            errorMessages(err, object);
        });
        return errors;
    },
};
exports.JNumber = Joi.number();
exports.JLat = exports.JNumber.min(-90).max(90);
exports.JLong = exports.JNumber.min(-180).max(180);
exports.JString = Joi.string().trim();
exports.JName = exports.JString.custom(exports.JLength.min(3)).custom(exports.JLength.max(25));
exports.JArray = Joi.array().items(exports.JString.required()).unique();
exports.JNumberArray = Joi.array().items(exports.JNumber.required()).unique();
exports.JDate = exports.JString.isoDate();
exports.JStartDate = exports.JDate;
exports.JOtp = exports.JString.min(6).max(6).regex(/^\d*$/);
exports.JEmail = exports.JString.lowercase().regex(api_constants_1.CONSTANT.REGEX.EMAIL);
exports.JMobile = exports.JString.min(4).max(14).regex(/^[1-9][0-9]{3,14}$/);
exports.JDialCode = exports.JString.max(10).replace(/^\+?/, '+');
exports.JPassword = exports.JString.regex(api_constants_1.CONSTANT.REGEX.PASSWORD);
exports.JID = exports.JString.length(24);
exports.JUserName = exports.JString.min(7).max(30).regex(/^[A-Za-z][A-Za-z0-9_\-\.]{7,29}$/);
exports.JDeviceType = exports.JString.valid(constants_1.DeviceType.ANDROID, constants_1.DeviceType.IOS);
exports.JToken = exports.JString;
exports.JUrl = exports.JString.uri({ allowRelative: true });
exports.JGender = exports.JString.valid(...Object.values(constants_1.UserGender));
exports.JFullName = Joi.object({
    first: exports.JName.required(),
    middle: exports.JName,
    last: exports.JName.required(),
});
exports.JQuery = Joi.object({});
exports.JUUID1 = exports.JString.guid({ version: 'uuidv1' });
exports.JLocationObject = Joi.object({
    coordinates: exports.JNumberArray.optional(),
    maxDistance: exports.JNumber.optional(),
    minDistance: exports.JNumber.optional()
});
exports.JList = Joi.object({
    page: exports.JNumber.default(1),
    limit: exports.JNumber.default(25).max(100),
    search: exports.JString,
    sort_by: exports.JString,
    sort_order: exports.JString.valid('asc', 'desc', '1', '-1').default('desc'),
});
exports.JPoint = Joi.object({
    type: exports.JString.allow('Point').default('Point'),
    coordinates: Joi.array().items(exports.JLong.default(0), exports.JLat.default(0)),
}).optional();
exports.JLocation = Joi.object({
    city: exports.JString.allow('', null),
    region: exports.JString.allow('', null),
    country: exports.JString,
    fullAddr: exports.JString,
}).optional();
exports.JLang = exports.JString.min(2).max(3);
exports.JBoolean = Joi.bool().valid('true', 'false', true, false);
exports.JComment = Joi.object({
    text: exports.JString.required(),
    mentions: Joi.array().items({
        id: exports.JUUID1.required(),
        profile_url: exports.JString.allow(null, ''),
        user_name: exports.JUserName.required(),
        name: exports.JName.required(),
        pets: Joi.object({
            id: exports.JUUID1.required(),
            name: exports.JName.required(),
            profile_url: exports.JString.allow(null, ''),
        }),
        start_pos: exports.JNumber.allow(null, ''),
    }),
    hashtags: Joi.array().items(Joi.object({
        name: exports.JString.max(50).regex(api_constants_1.CONSTANT.REGEX.HASHTAG).required(),
        id: exports.JString,
        start_pos: exports.JNumber,
    })),
});
