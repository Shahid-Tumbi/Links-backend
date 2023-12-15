"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const Joi = require("joi");
const utils_1 = require("../../utils");
function validateSchema(schema, dataResolver) {
    return (req, res, next) => {
        // console.log('Validating Schema');
        const data = typeof dataResolver === 'function' ? dataResolver(req) : req[dataResolver];
        try {
            const result = Joi.attempt(data, schema);
            req.data = Object.assign(Object.assign({}, (req.data || {})), result);
            next();
        }
        catch (error) {
            const message = error.details[0].message.split('\'').join('');
            res.error(new utils_1.ResponseError(400, message.replace(new RegExp('\"', 'gi'), '')));
        }
    };
}
exports.validateSchema = validateSchema;
