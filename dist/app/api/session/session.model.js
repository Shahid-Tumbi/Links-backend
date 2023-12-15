"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const user_constants_1 = require("../../constants/user.constants");
const mongoose_1 = require("mongoose");
const session_constants_1 = require("./session.constants");
const sessionSchema = new mongoose_1.Schema({
    deviceToken: {
        type: String,
        required: false,
    },
    deviceType: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    userType: {
        type: String,
        enum: Object.values(user_constants_1.UserType),
        default: user_constants_1.UserType.User
    },
    deviceModel: {
        type: String,
        required: false
    },
    deviceId: {
        type: String,
        rqeuired: false
    },
    voipToken: {
        type: String,
        required: false
    },
    ipAddress: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        defaultValue: true
    },
    signType: {
        type: String,
        enum: Object.values(user_constants_1.LoginType),
        defaultValue: user_constants_1.LoginType.Normal
    },
}, {
    timestamps: true,
    collection: session_constants_1.SESSION_COLLECTION,
});
exports.SessionModel = (0, mongoose_1.model)(session_constants_1.SESSION_COLLECTION, sessionSchema);
