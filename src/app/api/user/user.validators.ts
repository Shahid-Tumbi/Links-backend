import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import {
	JString,
	JPassword,
	JName,
	JEmail,
	JMobile,
	JPoint,
	JDialCode,
	JNumber,
	JOtp,
	JUserName,
	JDeviceType,
	JToken,
	JUrl,
	JGender,
	JUUID1,
	JList,
	JStartDate,
	JMessages,
	JArray,
} from '@validators/index';
import { LoginType, UserStatus } from '@constants/user.constants';
import { PrimaryField, UserSearchType, UserDashboard, AgeGroup } from './user.interface';
import { CONSTANT } from '../api.constants';

const JUser = Joi.object({
	countryCode: JDialCode.required(),
	phoneNumber: JMobile.required(),
	email: JEmail.required(),
	name: JName.required(),
	password: JPassword.required(),
	deviceToken: JString.optional().allow(""),
	latitude: JNumber.optional().allow(""),
	longitude: JNumber.optional().allow(""),
	userName: JUserName.required(),
	referralCode: JString.optional().allow(""),
	referrer: JString.optional().allow("")
});

const JDeviceToken = JString;

const JPrimaryField = JString.valid(PrimaryField.Email, PrimaryField.Phone_Number);

const JAddress = Joi.object({
	city: JString.allow(null, ''),
	region: JString.allow(null, ''),
	country: JString.allow(null, ''),
	fullAddr: JString.allow(null, ''),
});

const JCommonProfile = Joi.object({
	profile_url: JUrl.allow(null, ''),
	thumb_url: JUrl.allow(null, ''),
	banner_url: JUrl.allow(null, ''),
	gender: JGender,
	bio: JString.allow(null, ''),
	location: JPoint,
	address: JAddress.allow(null, ''),
});

const JSocialLogin = Joi.object({
	email: JEmail.allow(null, ''),
	device_token: JDeviceToken.allow(null, ''),
	device_model: JString.allow(null, ''),
	device_type: JDeviceType,
	token: JToken.required(),
	sign_type: JString.valid(LoginType.Facebook, LoginType.Google, LoginType.Apple).required(),
	country_code: JDialCode.allow(null, ''),
	phone_number: JMobile.allow(null, '').error(JMessages.stringDigits),
	name: JName.allow(null, ''),
	voip_token: JString.allow(null, ''),
	image_url: JUrl.allow(null, ''),
	primary_field: JPrimaryField.default(PrimaryField.Email),
});

export const userValidators = {
	/**
	 * @name verify
	 * @description It validate the request paramters with the schema.
	 * @requires type,user
	 */
	register: validateSchema(JUser, 'body'),
	changeAuth: validateSchema(JUser, 'body'),
	verifyAuth: validateSchema(Joi.object({
		type: JString.valid(PrimaryField.Email, PrimaryField.Phone_Number).required(),
	}), 'body'),
	login: validateSchema(Joi.object({
		password: JPassword.required(),
		user:JString.required(),
		countryCode:JString.optional(),
		deviceToken:JString.optional()
	}), 'body'),
	verifyOtp: validateSchema(Joi.object({
		otp: JOtp.required()
	}), 'body'),
	resendOtp: validateSchema(Joi.object({
	}), 'body'),
	updateUserData:validateSchema(Joi.object({
		name: JName.optional(),
		latitude:JString.optional(),
		longitude:JString.optional(),
		pushNotification:Joi.boolean().optional(),
		emailNotification:Joi.boolean().optional(),
		profileImage:JString.optional(),
		deviceToken:JString.optional(),
		address:JString.optional(),
		isPrivate:Joi.boolean().optional()
	}),'body'),
	updateUserDataSchemas:validateSchema(Joi.object({
		_id: JString.required()
	}), 'params'),
	notification:validateSchema(Joi.object({
		registrationToken: JArray.required(),
		message: Joi.object().required(),
	}),'body'),
	social: validateSchema(JSocialLogin, 'body'),
	completeProfile: validateSchema(JCommonProfile.keys({
		user_name: JUserName.required().error(JMessages.userNameError),
		interests: Joi.array().items(JUUID1),
		other_interests: Joi.boolean().default(false),
	}), 'body'),
	updateProfile: validateSchema(JCommonProfile.keys({
		name: JName,
		age_group: JString,
		user_name: JUserName.error(JMessages.userNameError),
		chat_wallpaper_url: JUrl.allow('', null),
		is_default_wallpaper: Joi.boolean(),
	}), 'body'),
	userNameAvailable: validateSchema(Joi.object({
		user_name: JUserName.required().error(JMessages.userNameError),
	}), 'params'),
	forgotPassword: validateSchema(Joi.object({ email: JEmail.required() }), 'body'),
	forgotPasswordOtp: validateSchema(Joi.object({
		otp: JOtp.required(),
		token: JToken.required(),
	}), 'body'),
	resendPasswordOtp: validateSchema(Joi.object({
		token: JToken.required(),
	}), 'body'),
	resetPassword: validateSchema(Joi.object({
		token: JToken.required(),
		password: JPassword.required(),
	}), 'body'),
	searchUserByName: validateSchema(Joi.object({
		search: JString.default(''),
		type: JNumber.valid(UserSearchType.User, UserSearchType.Pet, UserSearchType.Both).default(UserSearchType.Both),
		limit: JNumber.default(25),
		post_tag_search: Joi.boolean().optional().default(false),
		page: JNumber.default(1),
	}), 'query'),
	knownPeople: validateSchema(JList.keys({
		start_date: JStartDate,
	}), 'query'),
	entity: validateSchema(Joi.object({
		userId: JUUID1.required(),
	}), 'params'),
	updateUserStatus: validateSchema(Joi.object({
		id: JUUID1.required(),
		status: JString.valid(UserStatus.Active, UserStatus.InActive, UserStatus.Deleted).required(),
	}), 'body'),
	changePassword: validateSchema(Joi.object({
		id: JString.required(),
		old_password: JString.required(),
		new_password: JPassword.required(),
	}), 'body'),
	chat: validateSchema(JList.keys({
		country: Joi.string().optional(),
		status: JString.valid(CONSTANT.DATABASE.STATUS.ACTIVE, CONSTANT.DATABASE.STATUS.INACTIVE).optional(),
		from_date: JString.optional(),
		to_date: JString.optional(),
	}), 'query'),
	report: validateSchema(Joi.object({
		reason_id: JUUID1.required(),
		description: JString,
	}), 'body'),
	updateDeviceToken: validateSchema(Joi.object({
		device_token: JDeviceToken.required(),
	}), 'body'),
	updatePrivacy: validateSchema(Joi.object({
		is_private: Joi.boolean().required(),
	}), 'body'),
	mentionUsers: validateSchema(JList.keys({
		type: JNumber.valid(UserSearchType.User, UserSearchType.Pet, UserSearchType.Both).default(UserSearchType.Both),
	}), 'body'),
	dasboard: validateSchema(JList.keys({
		type: JString.valid(...Object.values(UserDashboard)).required(),
		from_date: JString.optional(),
		to_date: JString.optional(),
		gender: JString.optional(),
		age_group: JString.valid(...Object.values(AgeGroup)).optional(),
	}), 'query'),
	entityUserId: validateSchema(Joi.object({
		user_id: JUUID1.required(),
	}), 'params'),
	logout : validateSchema(Joi.object({
		deviceToken: JString.optional(),
		userId: JString.required()
	}),'body'),
	follow : validateSchema(Joi.object({
		followerId: JString.required(),
		followingId: JString.required()
	}),'body')
};
