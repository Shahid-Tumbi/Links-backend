"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
// tslint:disable-next-line: no-var-requires
const revalidator = require('revalidator');
const schemaValidator = (schema) => {
    return (value) => {
        const results = revalidator.validate(value, schema);
        if (!results.valid) {
            throw new Error(JSON.stringify(results.errors));
        }
    };
};
exports.schemaValidator = schemaValidator;
