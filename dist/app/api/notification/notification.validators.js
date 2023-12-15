"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationValidators = void 0;
const Joi = require("joi");
const validator_1 = require("../../middlewares/validator");
const index_1 = require("../../validators/index");
const JNotification = Joi.object({
    fromUser: index_1.JString.optional(),
    toUser: index_1.JString.required(),
    notificationType: index_1.JString.optional(),
    content: index_1.JString.required(),
    title: index_1.JString.required(),
});
exports.notificationValidators = {
    /**
     * @name verify
     * @description It validate the request paramters with the schema.
     * @requires type,Review
     */
    Notification: (0, validator_1.validateSchema)(JNotification, 'body'),
    listNotification: (0, validator_1.validateSchema)(Joi.object({
        page: index_1.JNumber.required(),
        limit: index_1.JNumber.required(),
        toUser: index_1.JString.optional(),
        app: index_1.JString.required(),
    }), 'body'),
    deleteNotification: (0, validator_1.validateSchema)(Joi.object({
        _id: index_1.JString.required()
    }), 'params'),
};
