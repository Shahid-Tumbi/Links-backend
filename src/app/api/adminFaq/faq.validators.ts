import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import { JPassword, JEmail, JString, JNumber, JDialCode, JMobile, JName, JBoolean } from '@validators/index';


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
	limit: JNumber.required()
});

const JAdminAddUserSchema = Joi.object({
	countryCode: JDialCode.required(),
	phoneNumber: JMobile.required(),
	email: JEmail.required(),
	name: JName.required()
});

const JAdminValidateFAQ = Joi.object({
	question: JString.trim().required(),
	answer: JString.trim().required(),
	lang: JString.trim().required(),
	userType: JString.required()
})

const JAdminValidateUpdateFAQ = Joi.object({
	question: JString.trim().optional(),
	answer: JString.trim().optional(),
	lang: JString.trim().optional(),
	userType: JString.optional(),
	status: JBoolean.optional()
})

const JAdminGetFAQs = Joi.object({
	page: JNumber.required(),
	limit: JNumber.required(),
	lang: JString.optional(),
	sortOrder: JNumber.allow(1, -1).optional(),
	userType: JString.required()
})

const JAdminGetFAQ = Joi.object({
	_id: JString.required()
})

export const adminValidators = {
	login: validateSchema(JAdmin, 'body'),
	logout: validateSchema(JAdminLogout, 'body'),
	userListing: validateSchema(JAdminUserListing, 'query'),
	createUser: validateSchema(JAdminAddUserSchema, 'body'),
	createFAQ: validateSchema(JAdminValidateFAQ, 'body'),
	updateFAQ: validateSchema(JAdminValidateUpdateFAQ, 'body'),
	updateFAQParams: validateSchema(JAdminGetFAQ, 'params'),
	fetchFAQ: validateSchema(JAdminGetFAQs, 'query'),
	fetachFAQDetail: validateSchema(JAdminGetFAQ, 'params'),
};