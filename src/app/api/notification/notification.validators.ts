import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import {
	JNumber,
	JString,
} from '@validators/index';


const JNotification = Joi.object({
	fromUser: JString.optional(),
	toUser: JString.required(),
	notificationType: JString.optional(),
	content: JString.required(),
	title: JString.required(),
});

export const notificationValidators = {
	/**
	 * @name verify
	 * @description It validate the request paramters with the schema.
	 * @requires type,Review
	 */
	Notification: validateSchema(JNotification, 'body'),
	listNotification: validateSchema(Joi.object({
		page: JNumber.required(),
		limit: JNumber.required(),
		toUser: JString.optional(),
		app: JString.required(),
	}), 'body'),
	deleteNotification:validateSchema(Joi.object({
		_id: JString.required()
	}), 'params'),
};
