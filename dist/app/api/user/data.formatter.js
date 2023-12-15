"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataFormat = void 0;
// @@ getUserDataById() in user service should have same attributes
const UserDataFormat = (data, authData) => {
    return {
        _id: data._id || '',
        name: data.name || '',
        email: data.email || '',
        createdAt: data.createdAt || '',
        phoneNumber: data.phoneNumber || 0,
        countryCode: data.countryCode || '',
        signType: data.signType || '',
        isPhoneVerified: data.isPhoneVerified || false,
        isEmailVerified: data.isEmailVerified || false,
        status: data.status,
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        pushNotification: data.pushNotification || false,
        emailNotification: data.emailNotification || false,
        profileImage: data.profileImage || '',
        address: data.address || '',
        userName: data.userName || '',
        isPrivate: data.isPrivate || false,
        referrer: (authData === null || authData === void 0 ? void 0 : authData.referrer) || '',
        referralCode: (authData === null || authData === void 0 ? void 0 : authData.referralCode) || '',
        bio: (data === null || data === void 0 ? void 0 : data.bio) || '',
        usertype: (data === null || data === void 0 ? void 0 : data.usertype) || '',
        score: (authData === null || authData === void 0 ? void 0 : authData.usertype) || '',
    };
};
exports.UserDataFormat = UserDataFormat;
