"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRequestModel = exports.FollowModel = exports.UserDetailModel = exports.User = void 0;
const constants_1 = require("../../constants");
const mongoose_1 = require("mongoose");
const api_constants_1 = require("../api.constants");
const userSchema = new mongoose_1.Schema({
    userName: { type: mongoose_1.Schema.Types.String },
    name: { type: mongoose_1.Schema.Types.String, required: true, index: true },
    email: { type: mongoose_1.Schema.Types.String, required: true, index: true },
    password: { type: mongoose_1.Schema.Types.String, required: true, index: true },
    countryCode: { type: mongoose_1.Schema.Types.String, required: true },
    phoneNumber: { type: mongoose_1.Schema.Types.String, required: true },
    otp: {
        otpCode: { type: mongoose_1.Schema.Types.String },
        expireTime: { type: mongoose_1.Schema.Types.Number }
    },
    isPhoneVerified: { type: mongoose_1.Schema.Types.Boolean, default: false },
    isEmailVerified: { type: mongoose_1.Schema.Types.Boolean, default: true },
    deviceToken: { type: mongoose_1.Schema.Types.String, default: false },
    profileImage: { type: mongoose_1.Schema.Types.String },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.values(constants_1.UserStatus),
        default: constants_1.UserStatus.Active,
    },
    latitude: { type: mongoose_1.Schema.Types.Number },
    longitude: { type: mongoose_1.Schema.Types.Number },
    pushNotification: { type: mongoose_1.Schema.Types.Boolean, default: false },
    emailNotification: { type: mongoose_1.Schema.Types.Boolean, default: false },
    address: { type: mongoose_1.Schema.Types.String },
    bio: { type: mongoose_1.Schema.Types.String },
    isPrivate: { type: mongoose_1.Schema.Types.Boolean, default: false },
    usertype: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.values(constants_1.UserType),
        default: constants_1.UserType.User,
    }
}, {
    timestamps: true,
    collection: api_constants_1.COLLECTION_NAME.user,
});
exports.User = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.user, userSchema);
const userDetailSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.String, index: true },
    totalFollowers: { type: mongoose_1.Schema.Types.Number, default: 0 },
    totalFollowings: { type: mongoose_1.Schema.Types.Number, default: 0 },
    referralCode: { type: mongoose_1.Schema.Types.String },
    referrer: { type: mongoose_1.Schema.Types.String },
    score: { type: mongoose_1.Schema.Types.Number, default: 0 }
}, {
    timestamps: true,
    collection: api_constants_1.COLLECTION_NAME.userDetail,
});
exports.UserDetailModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.userDetail, userDetailSchema);
const followSchema = new mongoose_1.Schema({
    followerId: { type: mongoose_1.Schema.Types.ObjectId, index: true },
    followingId: { type: mongoose_1.Schema.Types.ObjectId, index: true },
    followRequestDate: { type: mongoose_1.Schema.Types.Date },
    is_deleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    collection: api_constants_1.COLLECTION_NAME.follow,
});
exports.FollowModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.follow, followSchema);
const followRequestSchema = new mongoose_1.Schema({
    followerId: { type: mongoose_1.Schema.Types.ObjectId, index: true },
    followingId: { type: mongoose_1.Schema.Types.ObjectId, index: true },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.values(constants_1.RequestStatus),
        default: constants_1.RequestStatus.Pending,
    },
}, {
    timestamps: true,
    collection: api_constants_1.COLLECTION_NAME.followRequest,
});
exports.FollowRequestModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.followRequest, followRequestSchema);
