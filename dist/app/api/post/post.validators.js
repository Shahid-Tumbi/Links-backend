"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidators = void 0;
const Joi = require("joi");
const validator_1 = require("../../middlewares/validator");
const index_1 = require("../../validators/index");
exports.postValidators = {
    /**
     * @name verify
     * @description It validate the request paramters with the schema.
     * @requires type,Review
     */
    create: (0, validator_1.validateSchema)(Joi.object({
        userId: index_1.JString.required(),
        title: index_1.JString,
        description: index_1.JString,
        link: index_1.JString,
        gpt_summary: index_1.JString,
        commentsEnable: Joi.boolean().optional().default(false),
        pinComment: index_1.JString.optional().allow('')
    }), 'body'),
    idParamsSchema: (0, validator_1.validateSchema)(Joi.object({
        _id: index_1.JString.required(),
    }), 'params'),
    updatePost: (0, validator_1.validateSchema)(Joi.object({
        title: index_1.JString,
        description: index_1.JString,
        link: index_1.JString,
        gpt_summary: index_1.JString,
    }), 'body'),
    likePost: (0, validator_1.validateSchema)(Joi.object({
        userId: index_1.JString.required(),
        postId: index_1.JString.required(),
    }), 'body'),
    commentPost: (0, validator_1.validateSchema)(Joi.object({
        userId: index_1.JString.required(),
        postId: index_1.JString.required(),
        parentId: index_1.JString.allow(),
        content: index_1.JString.allow()
    }), 'body'),
    commentUpdate: (0, validator_1.validateSchema)(Joi.object({
        content: index_1.JString
    }), 'body'),
    sharePost: (0, validator_1.validateSchema)(Joi.object({
        userId: index_1.JString.required(),
        postId: index_1.JString.required(),
    }), 'body')
};
