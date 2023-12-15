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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const constants_1 = require("../../constants");
const utils_1 = require("../../../utils");
const upload_util_1 = require("../../../utils/upload.util");
const api_constants_1 = require("../api.constants");
const session_1 = require("../session");
const data_formatter_1 = require("./data.formatter");
const sendEmail_1 = require("../../../utils/sendEmail");
const user_constants_1 = require("./user.constants");
const user_model_1 = require("./user.model");
const rabbitmq_1 = require("../../../rabbitmq");
const getimage_util_1 = require("../../../utils/getimage.util");
const mongodb_1 = require("mongodb");
const database_1 = require("../../../database");
const useragent = require('express-useragent');
class UserService {
    constructor() {
        this.Model = user_model_1.UserDetailModel;
        this.UserModel = user_model_1.User;
    }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.data;
                utils_1.Console.info(`partial ${JSON.stringify(req.client)}`);
                // @TODO set limit to 1 to count
                const { email, phoneNumber, countryCode } = data;
                const [isEmailExists, isPhoneExists] = yield Promise.all([
                    this.UserModel.exists({
                        email,
                        status: { $ne: constants_1.UserStatus.Deleted },
                    }),
                    this.UserModel.exists({
                        phoneNumber,
                        countryCode,
                        status: { $ne: constants_1.UserStatus.Deleted },
                    }),
                ]);
                if (isEmailExists) {
                    return Promise.reject(new utils_1.ResponseError(422, user_constants_1.USER_MESSAGES.REGISTER.EMAIL_EXISTS));
                }
                if (isPhoneExists) {
                    return Promise.reject(new utils_1.ResponseError(422, user_constants_1.USER_MESSAGES.REGISTER.PHONE_EXISTS));
                }
                if (data.referrer) {
                    yield this.referrerProcess(data.referrer);
                }
                const password = yield utils_1.passwordUtil.hash(data.password);
                const otpNumber = (0, utils_1.randomNumberStringGenerator)(6);
                const otpExpireTime = Date.now() + api_constants_1.CONSTANT.OTP.EXP_TIME * 1000;
                const referralCode = (0, utils_1.randomStringGenerator)(6);
                const userName = (0, utils_1.generateFromEmail)(email, 4);
                const auth = yield this.UserModel.create(Object.assign(Object.assign({}, data), { password,
                    userName, otp: {
                        otpCode: otpNumber,
                        expireTime: otpExpireTime,
                    }, name: data.name, usertype: data.referrer ? constants_1.UserType.Curator : constants_1.UserType.User }));
                const profile = yield this.Model.create({
                    userId: auth._id,
                    referralCode: referralCode,
                    referrer: data.referrer
                });
                // create session to login
                const token = yield session_1.sessionService.create(auth._id, {
                    ipAddress: req.ip,
                    deviceType: useragent.isMobile ? 'mobile' : 'desktop',
                    deviceModel: (useragent === null || useragent === void 0 ? void 0 : useragent.device) ? useragent === null || useragent === void 0 ? void 0 : useragent.device : req.headers['user-agent'],
                    deviceToken: data.deviceToken,
                    signType: constants_1.LoginType.Normal,
                    userType: constants_1.UserType.User,
                }, {
                    name: auth.name,
                });
                // send Otp
                // smsUtil(profile.phoneNumber, otpNumber);
                // sendSignUpOtpMessage(profile.countryCode, profile.phoneNumber, otpNumber, profile.name).catch((error) => {
                // 	console.error(`Otp was not sent to ${profile.name} over ${profile.phoneNumber}`);
                // 	console.error(error);
                // });
                // @TODO send verification email = Done
                // @TODO generate otp code - Done
                // @TODO send otp message - Done
                // @TODO add primary_account_id
                return { profile: (0, data_formatter_1.UserDataFormat)(auth, profile), token, otpNumber };
            }
            catch (error) {
                utils_1.Console.error('Error in regsiteration service', error);
                return Promise.reject(new utils_1.ResponseError(422, error.message || error));
            }
        });
    }
    referrerProcess(referrerCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const findReffaralCode = yield this.Model.countDocuments({
                referralCode: referrerCode
            });
            if (findReffaralCode == 0) {
                throw new Error(user_constants_1.USER_MESSAGES.REFERRAL.CODE_NOT_EXIST);
            }
            const countRefferUsage = yield this.Model.countDocuments({
                referrer: referrerCode
            });
            if (countRefferUsage >= api_constants_1.CONSTANT.REFERRAL_USAGE_COUNT.COUNT) {
                throw new Error(user_constants_1.USER_MESSAGES.REFERRAL.USAGE_LIMIT);
            }
        });
    }
    verifyOtp(data, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserModel.findOne({ _id: id }, { otp: 1, email: 1, countryCode: 1, phoneNumber: 1, name: 1 });
                if (!result) {
                    return Promise.reject(new utils_1.ResponseError(400, user_constants_1.USER_MESSAGES.ACCOUNT_BLOCKED));
                }
                {
                    const where = {
                        _id: id,
                        status: { $ne: constants_1.UserStatus.Deleted },
                        countryCode: result.countryCode,
                        phoneNumber: result.phoneNumber,
                        isPhoneVerified: true,
                    };
                    const isAlreadyUsed = yield this.UserModel.countDocuments(where);
                    if (isAlreadyUsed) {
                        return Promise.reject(new utils_1.ResponseError(400, user_constants_1.USER_MESSAGES.PHONE_ALREADY_LINKED));
                    }
                }
                if (!data.otp ||
                    (result.otp.otpCode.toString() !== data.otp.toString() &&
                        data.otp !== user_constants_1.BY_PASS_OTP)) {
                    return Promise.reject(new utils_1.ResponseError(400, user_constants_1.USER_MESSAGES.VERIFY_OTP.INVALID));
                }
                if (data.otp !== user_constants_1.BY_PASS_OTP) {
                    // @ts-ignore
                    if (result.otp.expireTime <= Date.now()) {
                        // time is milisecond // 45 second
                        return Promise.reject(new utils_1.ResponseError(400, user_constants_1.USER_MESSAGES.VERIFY_OTP.EXPIRED));
                    }
                }
                let message = user_constants_1.USER_MESSAGES.VERIFY_OTP.PHONE_VERIFIED;
                yield this.UserModel.updateOne({ _id: id }, { $set: { isPhoneVerified: true } });
                (0, sendEmail_1.default)(result.email, result.name, '', true);
                return message;
            }
            catch (error) {
                utils_1.Console.error('Error in verifyOtp service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Resends an OTP (One-Time Password) to a user.
     * It generates a new OTP code, updates the user's record in the database with the new OTP code and its expiration time,
     * and sends the OTP message to the user's phone number.
     * @param data - Additional data for the method (not used in this method).
     * @param user - The user object containing the user's ID (`id`).
     * @returns A promise that resolves if the OTP is resent successfully, otherwise rejects with an error.
     */
    resendOtp(data, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user's record in the database using the provided user ID
                const user = yield this.UserModel.findOne({ _id: id }, { otp: 1, countryCode: 1, phoneNumber: 1, email: 1, name: 1 });
                if (!user) {
                    // If the user's record is not found, reject the promise with an error indicating an invalid token
                    throw new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.RESEND_OTP.INVALID_TOKEN);
                }
                // Generate a new OTP code
                const otpNumber = (0, utils_1.randomNumberStringGenerator)(6);
                const otpExpireTime = Date.now() + api_constants_1.CONSTANT.OTP.EXP_TIME * 1000;
                // Update the user's record in the database with the new OTP code and its expiration time
                yield this.UserModel.updateOne({ _id: id }, { $set: { otp: { otpCode: otpNumber.toString(), expireTime: otpExpireTime } } });
                // Send the OTP message to the user's phone number
                // smsUtil(user.phoneNumber, otpNumber);
                // sendOtpMessage(user.countryCode, user.phoneNumber, otpNumber, user.name);
            }
            catch (error) {
                utils_1.Console.error('Error in resendOtp service', error);
                throw new utils_1.ResponseError(422, error);
            }
        });
    }
    /**
     * Handles the login functionality for users by verifying their credentials and generating a session token.
     * @param data An object containing the login data, including the user's email or phone number and password.
     * @param client An object containing the client information, such as language, IP address, device ID, device type, device model, and ISO2 country code.
     * @returns An object containing the user's profile data and a session token.
     */
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            const data = req.data;
            if (data.countryCode) {
                where = {
                    status: { $ne: constants_1.UserStatus.Deleted },
                    countryCode: data.countryCode,
                    phoneNumber: data.user,
                };
            }
            else if (data.user.includes('@' && '.')) {
                where = {
                    status: { $ne: constants_1.UserStatus.Deleted },
                    email: data.user.toLowerCase(),
                };
            }
            else {
                where = {
                    status: { $ne: constants_1.UserStatus.Deleted },
                    userName: data.user,
                };
            }
            const result = yield this.UserModel.findOne(Object.assign({}, where));
            if (!result) {
                const { EMAIL_NOT_FOUND, PHONE_NOT_FOUND, USER_NOT_FOUND } = user_constants_1.USER_MESSAGES;
                const MSG = data.countryCode ? PHONE_NOT_FOUND : data.user.includes('@' && '.') ? EMAIL_NOT_FOUND : USER_NOT_FOUND;
                return Promise.reject(new utils_1.ResponseError(422, MSG));
            }
            const user = yield this.Model.findOne({ userId: result._id });
            const isPasswordVerified = yield this.verifyPassword(result, data.password);
            if (!isPasswordVerified) {
                return Promise.reject(new utils_1.ResponseError(422, user_constants_1.USER_MESSAGES.LOGIN.INVALID));
            }
            const token = yield session_1.sessionService.create(result._id, {
                ipAddress: req.ip,
                deviceType: useragent.isMobile ? 'mobile' : 'desktop',
                deviceModel: (useragent === null || useragent === void 0 ? void 0 : useragent.device) ? useragent === null || useragent === void 0 ? void 0 : useragent.device : req.headers['user-agent'],
                deviceToken: data.deviceToken,
                signType: constants_1.LoginType.Normal,
                userType: constants_1.UserType.User,
            }, {
                name: result.name,
            });
            return { profile: (0, data_formatter_1.UserDataFormat)(result, user), token };
        });
    }
    verifyPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('--pasword--', password);
                return yield utils_1.passwordUtil.verify.call(user, password);
            }
            catch (error) {
                return Promise.reject(new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.LOGIN.INVALID));
            }
        });
    }
    updateUserData(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (payload.referrer) {
                    yield this.referrerProcess(payload.referrer);
                    yield this.Model.findOneAndUpdate({ userId: payload._id }, {
                        referrer: payload.referrer
                    });
                }
                return yield this.UserModel.findByIdAndUpdate({ _id: payload._id }, { $set: Object.assign(Object.assign({}, payload), { usertype: payload.referrer ? constants_1.UserType.Curator : constants_1.UserType.User }) }, { projection: { password: 0 }, new: true });
            }
            catch (error) {
                utils_1.Console.error('Error in user UpdateData service', error);
                return Promise.reject(new utils_1.ResponseError(422, (error === null || error === void 0 ? void 0 : error.message) || error));
            }
        });
    }
    forgotPassword(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                const emailRegex = api_constants_1.CONSTANT.REGEX.EMAIL;
                if (emailRegex.test(payload.user)) {
                    result = yield this.UserModel.findOne({ email: payload.user.toLowerCase() });
                }
                else {
                    const usernameOrPhoneRegex = new RegExp(`^${payload.user}$`, 'i');
                    result = yield this.UserModel.findOne({
                        $or: [
                            { userName: usernameOrPhoneRegex },
                            { phoneNumber: usernameOrPhoneRegex }
                        ]
                    });
                }
                if (result == null) {
                    return Promise.reject(new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.INVALID_CREDENTIAL.INVALID));
                }
                else {
                    const token = yield utils_1.tokenUtil.generateAuthToken({
                        id: result._id,
                        session: result._id,
                        type: constants_1.UserType.User,
                    }, constants_1.UserType.User, '1d');
                    const resetLink = `${utils_1.environment.resetPasswordURL}${token}`;
                    (0, sendEmail_1.default)(result.email, '', resetLink, false);
                }
            }
            catch (error) {
                utils_1.Console.error('Error in verifyOtp service', error);
                return Promise.reject(new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.INVALID_CREDENTIAL.INVALID));
            }
        });
    }
    /**
     * Changes the password of a user.
     * @param data - An object containing the user ID, old password, and new password.
     * @returns An empty object if the password change is successful.
     * @throws ResponseError if the old password is invalid or an error occurs during the process.
     */
    changePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.findOne({ _id: data.id });
                const isPasswordVerified = yield this.verifyPassword(user, data.old_password);
                if (!isPasswordVerified) {
                    throw new utils_1.ResponseError(422, user_constants_1.USER_MESSAGES.LOGIN.INVALID);
                }
                const password = yield utils_1.passwordUtil.hash(data.new_password);
                yield this.UserModel.updateOne({ _id: data.id }, { password });
                return {};
            }
            catch (error) {
                console.error('Error in changePassword service', error);
                throw new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.INVALID_CREDENTIAL.INVALID);
            }
        });
    }
    logout(_a, req) {
        var { deviceToken } = _a, data = __rest(_a, ["deviceToken"]);
        return __awaiter(this, void 0, void 0, function* () {
            console.info('data', data);
            try {
                utils_1.tokenUtil.expireToken(req.header('authorization'), constants_1.UserType.User);
                session_1.sessionService.logout(data.userId);
                return {};
            }
            catch (error) {
                utils_1.Console.error('Error in User login service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    notification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('reqBody', req.body);
            try {
                yield (0, rabbitmq_1.producer)(req.body, user_constants_1.QueueName.notification);
                yield (0, rabbitmq_1.consumer)(user_constants_1.QueueName.notification);
            }
            catch (err) {
                return err;
            }
        });
    }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userUpload = 'LinksUser';
                return (0, upload_util_1.default)(req, userUpload);
            }
            catch (error) {
                console.log('error', error);
                return error;
            }
        });
    }
    constantData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_constants_1.LinksConstant;
            }
            catch (error) {
                utils_1.Console.error('Error in  service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    getImageFromS3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, getimage_util_1.default)(req, res);
            }
            catch (error) {
                utils_1.Console.error('Error in  service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    follow(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followExist = yield user_model_1.FollowModel.find(req.body);
                if (followExist.length > 0) {
                    return Promise.reject(new utils_1.ResponseError(400, user_constants_1.USER_MESSAGES.FOLLOW.ALREADY));
                }
                const { followingId } = req.body;
                const isProfilePrivate = yield this.UserModel.findById(followingId);
                if (isProfilePrivate === null || isProfilePrivate === void 0 ? void 0 : isProfilePrivate.isPrivate) {
                    yield user_model_1.FollowRequestModel.create(req.body);
                    return user_constants_1.USER_MESSAGES.REQUEST.SEND.EN;
                }
                yield user_model_1.FollowModel.create(Object.assign(Object.assign({}, req.body), { followRequestDate: new Date() }));
                (0, rabbitmq_1.producer)(req.body, user_constants_1.QueueName.follow);
                (0, rabbitmq_1.consumer)(user_constants_1.QueueName.follow);
                return user_constants_1.USER_MESSAGES.FOLLOW.SUCCESS.EN;
            }
            catch (error) {
                utils_1.Console.error('Error in  service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    getUserFollowList(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = new mongodb_1.ObjectId(req.params._id);
                const page = parseInt((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || 1;
                const limit = parseInt((_b = req.query.limit) === null || _b === void 0 ? void 0 : _b.toString()) || 10;
                let matchCriteria;
                if (req.path.includes('/followers/')) {
                    matchCriteria = { followingId: userId };
                }
                else if (req.path.includes('/following/')) {
                    matchCriteria = { followerId: userId };
                }
                else {
                    return Promise.reject(new utils_1.ResponseError(400, 'Invalid endpoint'));
                }
                const pipeline = [
                    {
                        $match: matchCriteria,
                    },
                    {
                        $lookup: {
                            from: 'user',
                            localField: req.path.includes('/followers/') ? 'followerId' : 'followingId',
                            foreignField: '_id',
                            as: 'followerInfo',
                        },
                    },
                    {
                        $unwind: '$followerInfo',
                    },
                    {
                        $project: {
                            _id: 0,
                            'followerInfo._id': 1,
                            'followerInfo.name': 1,
                            'followerInfo.profileImage': 1,
                        },
                    },
                ];
                return yield database_1.DAO.paginateWithNextHit(user_model_1.FollowModel, pipeline, limit, page);
            }
            catch (error) {
                console.error('Error in service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    unfollow(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followerId, followingId } = req.body;
                const result = yield user_model_1.FollowModel.deleteOne({ followerId, followingId });
                if (result.deletedCount === 1) {
                    (0, rabbitmq_1.producer)(req.body, user_constants_1.QueueName.unfollow);
                    (0, rabbitmq_1.consumer)(user_constants_1.QueueName.unfollow);
                    return user_constants_1.USER_MESSAGES.UNFOLLOW.SUCCESS.EN;
                }
                else {
                    return Promise.reject(new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.UNFOLLOW.ALREADY));
                }
            }
            catch (error) {
                utils_1.Console.error('Error in  service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    resetPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, token } = req.body;
                const user = yield utils_1.tokenUtil.verifyAuthToken(token, constants_1.UserType.User);
                console.log('USER', user);
                if (!user) {
                    throw new utils_1.ResponseError(401, user_constants_1.USER_MESSAGES.RESEND_OTP.INVALID_TOKEN);
                }
                const newPassword = yield utils_1.passwordUtil.hash(password);
                const profile = yield this.UserModel.findOneAndUpdate({ _id: user.id }, { $set: { password: newPassword } }, { new: true });
                const newToken = yield session_1.sessionService.create(profile._id, {
                    ipAddress: req.ip,
                    deviceType: useragent.isMobile ? 'mobile' : 'desktop',
                    deviceModel: (useragent === null || useragent === void 0 ? void 0 : useragent.device) ? useragent === null || useragent === void 0 ? void 0 : useragent.device : req.headers['user-agent'],
                    deviceToken: profile.deviceToken,
                    signType: constants_1.LoginType.Normal,
                    userType: constants_1.UserType.User,
                }, {
                    name: profile.name,
                });
                utils_1.tokenUtil.expireToken(token, constants_1.UserType.User);
                return { profile: (0, data_formatter_1.UserDataFormat)(profile, user), token: newToken };
            }
            catch (error) {
                utils_1.Console.error('Error in  service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
}
exports.userService = new UserService();
