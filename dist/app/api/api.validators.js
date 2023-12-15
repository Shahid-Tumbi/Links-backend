"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiValidators = void 0;
const middlewares_1 = require("../middlewares");
const Joi = require("joi");
const api_constants_1 = require("./api.constants");
const index_1 = require("../validators/index");
const constants_1 = require("../constants");
exports.apiValidators = {
    entity: (0, middlewares_1.validateSchema)(Joi.object({
        id: index_1.JString.length(24).required(),
    }), 'params'),
    syncData: (0, middlewares_1.validateSchema)(Joi.object(Object.values(api_constants_1.CONSTANT.DATABASE.ENTITY).reduce((schema, entity) => {
        schema[entity] = Joi.boolean().default(true);
        return schema;
    }, {})), 'query'),
    home: (0, middlewares_1.validateSchema)(index_1.JList.keys({
        address: index_1.JString.allow(null, ''),
        hashtag_id: index_1.JUUID1,
        is_klip: Joi.boolean(),
    }), 'query'),
    globalSearch: (0, middlewares_1.validateSchema)(index_1.JList.keys({
        type: index_1.JString
            .valid(...Object.values(constants_1.GlobalSearchType))
            .default(constants_1.GlobalSearchType.Top),
    }), 'query'),
    socialMix: (0, middlewares_1.validateSchema)(index_1.JList, 'query')
};
