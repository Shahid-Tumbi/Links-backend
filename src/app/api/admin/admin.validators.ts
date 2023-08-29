import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import { JPassword, JEmail, JString, JNumber, JDialCode, JMobile, JName, JArray } from '@validators/index';


const JAdmin = Joi.object({
	password: JPassword.required(),
	countryCode: JString.optional(),
	deviceToken: JString.optional(),
	email: JEmail.required()
});

const JAdminLogout = Joi.object({
	deviceToken: JString.optional(),
	adminId: JString.required()
});


const JAdminUserListing = Joi.object({
	page: JNumber.required(),
	limit: JNumber.required(),
	search: JString.optional()
});

const JAdminPhotographerListing = Joi.object({
	page: JNumber.required(),
	limit: JNumber.required(),
	search: JString.optional()
});

const JAdminAddUserSchema = Joi.object({
	countryCode: JDialCode.required(),
	phoneNumber: JMobile.required(),
	email: JEmail.required(),
	name: JName.required(),
	profileImage: JString.optional(),
	// profilePicture:JString
	// location:
});

const JAdminGetUser = Joi.object({
	_id: JString.required()
})

const JAdminUpdateUserSchema = Joi.object({
	name: JName.required(),
	profileImage: JString.optional(),
	// profilePicture:JString
	// location:
});
const JAdminAddPhotographerSchema = Joi.object({
	countryCode: JDialCode.required(),
	phoneNumber: JMobile.required(),
	email: JEmail.required(),
	name: JName.required(),
	expertiseLevel: JNumber.required(),
	timePeriod: JArray.required(),
	latitude: JNumber.required(),
	longitude: JNumber.required(),
	onlinePortfolio: JString.optional().allow(''),
	instagramHandle: JString.optional().allow(''),
	facebookProfile: JString.optional().allow(''),
	twitterHandle: JString.optional().allow(''),
	photographerWorkExperience: JNumber.optional().allow(''),
	aboutPhotographer: JString.optional().allow(''),
	perWeekShootingHours: JNumber.optional().allow(''),
	cameraTypes: JString.optional().allow(''),
	pushNotification: Joi.boolean().optional(),
	emailNotification: Joi.boolean().optional(),
	profileImage: JString.optional(),
	hourlyCharges: JNumber.optional().allow(''),
	// profilePicture:JString
	// location:
});
const JAdminGetPhotographer = Joi.object({
	_id: JString.required()
})
const JAdminUpdatePhotographerSchema = Joi.object({
	name: JName.optional(),
	expertiseLevel: JNumber.optional(),
	timePeriod: JArray.optional(),
	latitude: JNumber.optional(),
	longitude: JNumber.optional(),
	onlinePortfolio: JString.optional().allow(''),
	instagramHandle: JString.optional().allow(''),
	facebookProfile: JString.optional().allow(''),
	twitterHandle: JString.optional().allow(''),
	photographerWorkExperience: JNumber.optional().allow(''),
	aboutPhotographer: JString.optional().allow(''),
	perWeekShootingHours: JNumber.optional().allow(''),
	cameraTypes: JString.optional().allow(''),
	pushNotification: Joi.boolean().optional(),
	emailNotification: Joi.boolean().optional(),
	profileImage: JString.optional(),
	hourlyCharges: JNumber.optional().allow(''),
	// profilePicture:JString
	// location:
});

const JAdminGetPhotographerRequest = Joi.object({
	page: JNumber.required(),
	limit: JNumber.required(),
	userId: JString.optional(),
	requestStatus: JString.optional(),
	photographerId: JString.optional(),
	paymentStatus: JString.optional(),
})

export const adminValidators = {
	login: validateSchema(JAdmin, 'body'),
	logout: validateSchema(JAdminLogout, 'body'),
	userListing: validateSchema(JAdminUserListing, 'query'),
	createUser: validateSchema(JAdminAddUserSchema, 'body'),
	updateUser: validateSchema(JAdminUpdateUserSchema, 'body'),
	updateUserParam: validateSchema(JAdminGetUser, 'params'),
	fetchUserDetail: validateSchema(JAdminGetUser, 'params'),
	photographerListing: validateSchema(JAdminPhotographerListing, 'body'),
	createPhotographer: validateSchema(JAdminAddPhotographerSchema, 'body'),
	fetchPhotographerDetail: validateSchema(JAdminGetPhotographer, 'params'),
	updatePhotographer: validateSchema(JAdminUpdatePhotographerSchema, 'body'),
	updatePhotographerParam: validateSchema(JAdminGetPhotographer, 'params'),
	listPhotographer: validateSchema(JAdminGetPhotographerRequest, 'body'),
	fetchPhotographerRequestDetail: validateSchema(Joi.object({
		_id: JString.required()
	}), 'params'),
	multiplePhotographerRequestUpdate: validateSchema(Joi.object({
		_id: JString.required()
	}), 'params'),
};