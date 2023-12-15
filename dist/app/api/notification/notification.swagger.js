"use strict";
/* tslint:disable:max-classes-per-file */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
// import { IPoint } from '../api.interface';
// export * from './banner/banner.swagger';
// export * from './contact/contact.swagger';
// export * from './connection/connection.swagger';
// export * from './verification/verification.swagger';
let NotificationModel = class NotificationModel {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message send from ',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '',
    }),
    __metadata("design:type", String)
], NotificationModel.prototype, "fromUser", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message send to ',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Test User',
    }),
    __metadata("design:type", String)
], NotificationModel.prototype, "toUser", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'notification type',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test@yopmail.com',
    }),
    __metadata("design:type", String)
], NotificationModel.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message body',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Admin@@321',
    }),
    __metadata("design:type", String)
], NotificationModel.prototype, "content", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message title',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test title',
    }),
    __metadata("design:type", String)
], NotificationModel.prototype, "title", void 0);
NotificationModel = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Notification Module',
        name: 'NotificationModel',
    })
], NotificationModel);
exports.NotificationModel = NotificationModel;
