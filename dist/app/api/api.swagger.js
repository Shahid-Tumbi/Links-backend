"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SListOptions = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
__exportStar(require("./user/user.swagger"), exports);
exports.SListOptions = {
    page: {
        type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
        required: false,
        description: 'Page Number',
        default: 1,
    },
    limit: {
        type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
        required: false,
        description: 'Page Limit',
        default: 10,
    },
    start_date: {
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        required: false,
        description: 'Start Date in UTC as ISO String(2020-06-16T09:31:16.698Z)',
    },
};
