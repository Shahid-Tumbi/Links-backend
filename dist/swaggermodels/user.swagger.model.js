"use strict";
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
exports.UserLogin = exports.UserRegister = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
/* tslint:disable:max-classes-per-file */
let UserRegister = class UserRegister {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Device Token to send notifications',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'A Unique Name',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test_123',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "userName", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'name of user',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Test User',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "name", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'email of user',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test@yopmail.com',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "email", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'password',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Admin@321',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'countryCode',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '+91',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'phone no of user',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '9876543210',
    }),
    __metadata("design:type", String)
], UserRegister.prototype, "phoneNumber", void 0);
UserRegister = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'User Add',
        name: 'UserRegister',
    })
], UserRegister);
exports.UserRegister = UserRegister;
let UserLogin = class UserLogin {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Device Token to send notifications',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '',
    }),
    __metadata("design:type", String)
], UserLogin.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'user',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test@yopmail.com | test_123',
    }),
    __metadata("design:type", String)
], UserLogin.prototype, "user", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'password',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Admin@321',
    }),
    __metadata("design:type", String)
], UserLogin.prototype, "password", void 0);
UserLogin = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Login User',
        name: 'UserLogin',
    })
], UserLogin);
exports.UserLogin = UserLogin;
