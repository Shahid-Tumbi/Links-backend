import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import { JString, JNumber, JBoolean } from '@validators/index';


const JDeviceValidateFAQ = Joi.object({
	question: JString.trim().required(),
	answer: JString.trim().required(),
	lang: JString.trim().required(),
	userType: JString.required()
})

const JDeviceValidateUpdateFAQ = Joi.object({
	question: JString.trim().optional(),
	answer: JString.trim().optional(),
	lang: JString.trim().optional(),
	userType: JString.optional(),
	status: JBoolean.optional()
})

const JDeviceGetFAQs = Joi.object({
	page: JNumber.required(),
	limit: JNumber.required(),
	lang: JString.optional(),
	sortOrder: JNumber.allow(1, -1).optional(),
	userType: JString.required()
})

const JDeviceGetFAQ = Joi.object({
	_id: JString.required()
})

export const deviceValidators = {
	createFAQ: validateSchema(JDeviceValidateFAQ, 'body'),
	updateFAQ: validateSchema(JDeviceValidateUpdateFAQ, 'body'),
	updateFAQParams: validateSchema(JDeviceGetFAQ, 'params'),
	fetchFAQ: validateSchema(JDeviceGetFAQs, 'query'),
	fetachFAQDetail: validateSchema(JDeviceGetFAQ, 'params'),
};