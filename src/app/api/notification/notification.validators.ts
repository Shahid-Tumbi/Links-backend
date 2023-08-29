import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import {
	JNumber,
	JString,
} from '@validators/index';


const JNotification = Joi.object({
	fromUser: JString.required(),
	toUser: JString.required(),
	notificationType: JString.optional(),
	content: JString.required(),
	title: JString.required(),
});

const JRatingUpdate = Joi.object({
	rating: JNumber.optional(),
	review: JString.optional(),
	createdAt: JString.optional(),
});

export const notificationValidators = {
	/**
	 * @name verify
	 * @description It validate the request paramters with the schema.
	 * @requires type,Review
	 */
	Notification: validateSchema(JNotification, 'body'),
	updateReview: validateSchema(JRatingUpdate, 'body'),
	updateReviewParam: validateSchema(Joi.object({
		_id: JString.required()
	}), 'params'),
	listNotification: validateSchema(Joi.object({
		page: JNumber.required(),
		limit: JNumber.required(),
		toUser: JString.optional(),
		app: JString.required(),
	}), 'body'),
};
