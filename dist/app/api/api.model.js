"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModel = void 0;
const mongoose_1 = require("mongoose");
const api_constants_1 = require("./api.constants");
const configSchema = new mongoose_1.Schema({
    firebase: { type: mongoose_1.Schema.Types.Boolean, default: false },
    SMS: { type: mongoose_1.Schema.Types.Boolean, default: false }
}, {
    collection: api_constants_1.COLLECTION_NAME.configSchema
});
exports.ConfigModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.configSchema, configSchema);
