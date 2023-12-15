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
exports.FollowUser = exports.LogoutData = exports.UpdateUserData = exports.PasswordData = exports.ResetPassword = exports.ForgotPasswordData = exports.ResendOtpData = exports.VerifyOtpData = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const user_constants_1 = require("./user.constants");
// import { IPoint } from '../api.interface';
// export * from './banner/banner.swagger';
// export * from './contact/contact.swagger';
// export * from './connection/connection.swagger';
// export * from './verification/verification.swagger';
let VerifyOtpData = class VerifyOtpData {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: '4 Digit Otp Code',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: user_constants_1.BY_PASS_OTP,
    }),
    __metadata("design:type", String)
], VerifyOtpData.prototype, "otp", void 0);
VerifyOtpData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'VerifyOtpData',
        name: 'VerifyOtpData',
    })
], VerifyOtpData);
exports.VerifyOtpData = VerifyOtpData;
let ResendOtpData = class ResendOtpData {
};
ResendOtpData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'ResendOtpData',
        name: 'ResendOtpData',
    })
], ResendOtpData);
exports.ResendOtpData = ResendOtpData;
let ForgotPasswordData = class ForgotPasswordData {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'users email,phone or username',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test@yopmail.com || 9879279897 || test123',
    }),
    __metadata("design:type", String)
], ForgotPasswordData.prototype, "user", void 0);
ForgotPasswordData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'ForgotPasswordData',
        description: '',
    })
], ForgotPasswordData);
exports.ForgotPasswordData = ForgotPasswordData;
let ResetPassword = class ResetPassword {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'auth token',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'authToken',
    }),
    __metadata("design:type", String)
], ResetPassword.prototype, "token", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'password',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'test@123',
    }),
    __metadata("design:type", String)
], ResetPassword.prototype, "password", void 0);
ResetPassword = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'ResetPassword',
        description: 'reset password',
    })
], ResetPassword);
exports.ResetPassword = ResetPassword;
let PasswordData = class PasswordData {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Id of User',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], PasswordData.prototype, "id", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        description: 'Old Password',
        example: '{password}',
    }),
    __metadata("design:type", String)
], PasswordData.prototype, "old_password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        description: 'New Password',
        example: '{password}',
    }),
    __metadata("design:type", String)
], PasswordData.prototype, "new_password", void 0);
PasswordData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Change Password',
        name: 'ChangePasswordData',
    })
], PasswordData);
exports.PasswordData = PasswordData;
let UpdateUserData = class UpdateUserData {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Device Token to send notifications',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'device token',
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'name of user',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'Test User',
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "name", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'latitude',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '21.170240',
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "latitude", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'longitude',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '72.831062',
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "longitude", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        type: swagger_express_ts_1.SwaggerDefinitionConstant.BOOLEAN,
        required: false,
        description: 'pushNotification',
        example: false,
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "pushNotification", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        type: swagger_express_ts_1.SwaggerDefinitionConstant.BOOLEAN,
        required: false,
        description: 'emailNotification',
        example: false,
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "emailNotification", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        required: false,
        description: 'profileImage',
        example: "",
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        type: swagger_express_ts_1.SwaggerDefinitionConstant.BOOLEAN,
        required: false,
        description: 'User profile is private or public',
        example: false,
    }),
    __metadata("design:type", String)
], UpdateUserData.prototype, "isPrivate", void 0);
UpdateUserData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'UpdateUserData',
        description: 'Update User Data',
    })
], UpdateUserData);
exports.UpdateUserData = UpdateUserData;
let LogoutData = class LogoutData {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Device Token to send notifications',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'device token',
    }),
    __metadata("design:type", String)
], LogoutData.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Id of User',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], LogoutData.prototype, "userId", void 0);
LogoutData = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Logout User',
        name: 'LogoutData',
    })
], LogoutData);
exports.LogoutData = LogoutData;
let FollowUser = class FollowUser {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Id of User that Follow someone',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], FollowUser.prototype, "followerId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Id of User that follow by someone',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], FollowUser.prototype, "followingId", void 0);
FollowUser = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Follow User',
        name: 'FollowUser',
    })
], FollowUser);
exports.FollowUser = FollowUser;
