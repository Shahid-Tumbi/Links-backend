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
        title: JString.allow(''),
        image: JString.allow(''),
        description: JString.allow(''),
        content: JString.allow(''),
        link: JString,
        gpt_summary: JString,
        commentsEnable: Joi.boolean().optional().default(false),
        pinComment:JString.optional().allow('')

    }), 'body'),

    idParamsSchema: validateSchema(Joi.object({
        _id: JString.required(),
    }),'params'),
    
    updatePost: validateSchema(Joi.object({
        title: JString,
        description: JString,
        link: JString,
        gpt_summary: JString,
    }),'body'),

    likePost: validateSchema(Joi.object({
        userId: JString.required(),
        postId: JString.required(),
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