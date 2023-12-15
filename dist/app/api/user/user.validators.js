"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const Joi = require("joi");
const validator_1 = require("../../middlewares/validator");
const index_1 = require("../../validators/index");
const user_constants_1 = require("../../constants/user.constants");
const user_interface_1 = require("./user.interface");
const api_constants_1 = require("../api.constants");
const JUser = Joi.object({
    countryCode: index_1.JDialCode.required(),
    phoneNumber: index_1.JMobile.required(),
    email: index_1.JEmail.required(),
    name: index_1.JName.required(),
    password: index_1.JPassword.required(),
    deviceToken: index_1.JString.optional().allow(""),
    latitude: index_1.JNumber.optional().allow(""),
    longitude: index_1.JNumber.optional().allow(""),
    userName: index_1.JUserName.optional().allow(""),
    referralCode: index_1.JString.optional().allow(""),
    referrer: index_1.JString.optional().allow("")
});
const JDeviceToken = index_1.JString;
const JPrimaryField = index_1.JString.valid(user_interface_1.PrimaryField.Email, user_interface_1.PrimaryField.Phone_Number);
const JAddress = Joi.object({
    city: index_1.JString.allow(null, ''),
    region: index_1.JString.allow(null, ''),
    country: index_1.JString.allow(null, ''),
    fullAddr: index_1.JString.allow(null, ''),
});
const JCommonProfile = Joi.object({
    profile_url: index_1.JUrl.allow(null, ''),
    thumb_url: index_1.JUrl.allow(null, ''),
    banner_url: index_1.JUrl.allow(null, ''),
    gender: index_1.JGender,
    bio: index_1.JString.allow(null, ''),
    location: index_1.JPoint,
    address: JAddress.allow(null, ''),
});
const JSocialLogin = Joi.object({
    email: index_1.JEmail.allow(null, ''),
    device_token: JDeviceToken.allow(null, ''),
    device_model: index_1.JString.allow(null, ''),
    device_type: index_1.JDeviceType,
    token: index_1.JToken.required(),
    sign_type: index_1.JString.valid(user_constants_1.LoginType.Facebook, user_constants_1.LoginType.Google, user_constants_1.LoginType.Apple).required(),
    country_code: index_1.JDialCode.allow(null, ''),
    phone_number: index_1.JMobile.allow(null, '').error(index_1.JMessages.stringDigits),
    name: index_1.JName.allow(null, ''),
    voip_token: index_1.JString.allow(null, ''),
    image_url: index_1.JUrl.allow(null, ''),
    primary_field: JPrimaryField.default(user_interface_1.PrimaryField.Email),
});
exports.userValidators = {
    /**
     * @name verify
     * @description It validate the request paramters with the schema.
     * @requires type,user
     */
    register: (0, validator_1.validateSchema)(JUser, 'body'),
    changeAuth: (0, validator_1.validateSchema)(JUser, 'body'),
    verifyAuth: (0, validator_1.validateSchema)(Joi.object({
        type: index_1.JString.valid(user_interface_1.PrimaryField.Email, user_interface_1.PrimaryField.Phone_Number).required(),
    }), 'body'),
    login: (0, validator_1.validateSchema)(Joi.object({
        password: index_1.JPassword.required(),
        user: index_1.JString.required(),
        countryCode: index_1.JString.optional(),
        deviceToken: index_1.JString.optional()
    }), 'body'),
    verifyOtp: (0, validator_1.validateSchema)(Joi.object({
        otp: index_1.JOtp.required()
    }), 'body'),
    resendOtp: (0, validator_1.validateSchema)(Joi.object({}), 'body'),
    updateUserData: (0, validator_1.validateSchema)(Joi.object({
        name: index_1.JName.optional(),
        latitude: index_1.JString.optional(),
        longitude: index_1.JString.optional(),
        pushNotification: Joi.boolean().optional(),
        emailNotification: Joi.boolean().optional(),
        profileImage: index_1.JString.optional(),
        deviceToken: index_1.JString.optional(),
        address: index_1.JString.optional(),
        isPrivate: Joi.boolean().optional(),
        referrer: index_1.JString.optional().allow(""),
        bio: index_1.JString.optional().allow("")
    }), 'body'),
    updateUserDataSchemas: (0, validator_1.validateSchema)(Joi.object({
        _id: index_1.JString.required()
    }), 'params'),
    notification: (0, validator_1.validateSchema)(Joi.object({
        registrationToken: index_1.JArray.required(),
        message: Joi.object().required(),
    }), 'body'),
    social: (0, validator_1.validateSchema)(JSocialLogin, 'body'),
    completeProfile: (0, validator_1.validateSchema)(JCommonProfile.keys({
        user_name: index_1.JUserName.required().error(index_1.JMessages.userNameError),
        interests: Joi.array().items(index_1.JUUID1),
        other_interests: Joi.boolean().default(false),
    }), 'body'),
    updateProfile: (0, validator_1.validateSchema)(JCommonProfile.keys({
        name: index_1.JName,
        age_group: index_1.JString,
        user_name: index_1.JUserName.error(index_1.JMessages.userNameError),
        chat_wallpaper_url: index_1.JUrl.allow('', null),
        is_default_wallpaper: Joi.boolean(),
    }), 'body'),
    userNameAvailable: (0, validator_1.validateSchema)(Joi.object({
        user_name: index_1.JUserName.required().error(index_1.JMessages.userNameError),
    }), 'params'),
    forgotPassword: (0, validator_1.validateSchema)(Joi.object({ user: index_1.JString.required() }), 'body'),
    forgotPasswordOtp: (0, validator_1.validateSchema)(Joi.object({
        otp: index_1.JOtp.required(),
        token: index_1.JToken.required(),
    }), 'body'),
    resendPasswordOtp: (0, validator_1.validateSchema)(Joi.object({
        token: index_1.JToken.required(),
    }), 'body'),
    resetPassword: (0, validator_1.validateSchema)(Joi.object({
        token: index_1.JToken.required(),
        password: index_1.JPassword.required(),
    }), 'body'),
    searchUserByName: (0, validator_1.validateSchema)(Joi.object({
        search: index_1.JString.default(''),
        type: index_1.JNumber.valid(user_interface_1.UserSearchType.User, user_interface_1.UserSearchType.Pet, user_interface_1.UserSearchType.Both).default(user_interface_1.UserSearchType.Both),
        limit: index_1.JNumber.default(25),
        post_tag_search: Joi.boolean().optional().default(false),
        page: index_1.JNumber.default(1),
    }), 'query'),
    knownPeople: (0, validator_1.validateSchema)(index_1.JList.keys({
        start_date: index_1.JStartDate,
    }), 'query'),
    entity: (0, validator_1.validateSchema)(Joi.object({
        userId: index_1.JUUID1.required(),
    }), 'params'),
    updateUserStatus: (0, validator_1.validateSchema)(Joi.object({
        id: index_1.JUUID1.required(),
        status: index_1.JString.valid(user_constants_1.UserStatus.Active, user_constants_1.UserStatus.InActive, user_constants_1.UserStatus.Deleted).required(),
    }), 'body'),
    changePassword: (0, validator_1.validateSchema)(Joi.object({
        id: index_1.JString.required(),
        old_password: index_1.JString.required(),
        new_password: index_1.JPassword.required(),
    }), 'body'),
    chat: (0, validator_1.validateSchema)(index_1.JList.keys({
        country: Joi.string().optional(),
        status: index_1.JString.valid(api_constants_1.CONSTANT.DATABASE.STATUS.ACTIVE, api_constants_1.CONSTANT.DATABASE.STATUS.INACTIVE).optional(),
        from_date: index_1.JString.optional(),
        to_date: index_1.JString.optional(),
    }), 'query'),
    report: (0, validator_1.validateSchema)(Joi.object({
        reason_id: index_1.JUUID1.required(),
        description: index_1.JString,
    }), 'body'),
    updateDeviceToken: (0, validator_1.validateSchema)(Joi.object({
        device_token: JDeviceToken.required(),
    }), 'body'),
    updatePrivacy: (0, validator_1.validateSchema)(Joi.object({
        is_private: Joi.boolean().required(),
    }), 'body'),
    mentionUsers: (0, validator_1.validateSchema)(index_1.JList.keys({
        type: index_1.JNumber.valid(user_interface_1.UserSearchType.User, user_interface_1.UserSearchType.Pet, user_interface_1.UserSearchType.Both).default(user_interface_1.UserSearchType.Both),
    }), 'body'),
    dasboard: (0, validator_1.validateSchema)(index_1.JList.keys({
        type: index_1.JString.valid(...Object.values(user_interface_1.UserDashboard)).required(),
        from_date: index_1.JString.optional(),
        to_date: index_1.JString.optional(),
        gender: index_1.JString.optional(),
        age_group: index_1.JString.valid(...Object.values(user_interface_1.AgeGroup)).optional(),
    }), 'query'),
    entityUserId: (0, validator_1.validateSchema)(Joi.object({
        user_id: index_1.JUUID1.required(),
    }), 'params'),
    logout: (0, validator_1.validateSchema)(Joi.object({
        deviceToken: index_1.JString.optional(),
        token: index_1.JToken.required(),
        userId: index_1.JString.required()
    }), 'body'),
    follow: (0, validator_1.validateSchema)(Joi.object({
        followerId: index_1.JString.required(),
        followingId: index_1.JString.required()
    }), 'body')
};
