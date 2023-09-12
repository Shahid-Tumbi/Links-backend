import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import {
	JString,
} from '@validators/index';
export const postValidators = {
	/**
	 * @name verify
	 * @description It validate the request paramters with the schema.
	 * @requires type,Review
	 */
    create: validateSchema(Joi.object({
        userId: JString.required(),
        title: JString,
        content: JString,
        link: JString,
        gpt_summary: JString,

    }), 'body'),

    idParamsSchema: validateSchema(Joi.object({
        _id: JString.required(),
    }),'params'),
    
    updatePost: validateSchema(Joi.object({
        title: JString,
        content: JString,
        link: JString,
        gpt_summary: JString,
    }),'body'),

};