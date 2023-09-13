import * as Joi from 'joi';
import { validateSchema } from '@middlewares/validator';
import {
    JNumber,
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

    likePost: validateSchema(Joi.object({
        userId: JString.required(),
        postId: JString.required(),
        rating: JNumber.required()
    }),'body'),

    commentPost: validateSchema(Joi.object({
        userId: JString.required(),
        postId: JString.required(),
        parentId: JString.allow(),
        content: JString.allow()
    }),'body'),

    commentUpdate: validateSchema(Joi.object({
        content: JString
    }),'body'),

    sharePost: validateSchema(Joi.object({
        userId: JString.required(),
        postId: JString.required(),
    }),'body')

};