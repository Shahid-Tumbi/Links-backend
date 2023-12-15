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
exports.userController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const user_constants_1 = require("./user.constants");
const user_service_1 = require("./user.service");
let UserController = 
/**
 * @description A controller to control user requests
 */
class UserController {
    register(req, res, next) {
        user_service_1.userService
            .register(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    verifyOtp(req, res, next) {
        user_service_1.userService
            .verifyOtp(req.data, req.user)
            .then((message) => {
            res.success(message || user_constants_1.USER_MESSAGES.VERIFY_OTP.SUCCESS);
        })
            .catch(next);
    }
    resendOtp(req, res, next) {
        user_service_1.userService
            .resendOtp(req.data, req.user)
            .then(() => {
            res.success(user_constants_1.USER_MESSAGES.RESEND_OTP.SUCCESS);
        })
            .catch(next);
    }
    login(req, res, next) {
        console.info(req.data, req.client);
        user_service_1.userService
            .login(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    forgotPassword(req, res, next) {
        user_service_1.userService
            .forgotPassword(req.data)
            .then((result) => {
            console.log('----result----', result);
            res.success(user_constants_1.USER_MESSAGES.FORGET_PASSWORD.SEND, result);
        })
            .catch(next);
    }
    resetPassword(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .resetPassword(req)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
    changePassword(req, res, next) {
        console.info(req.data);
        user_service_1.userService
            .changePassword(req.data)
            .then((result) => {
            res.success(user_constants_1.USER_MESSAGES.FORGET_PASSWORD.SUCCESS, result);
        })
            .catch(next);
    }
    updateUserData(req, res, next) {
        user_service_1.userService
            .updateUserData(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    logout(req, res, next) {
        console.info('req', req.data);
        user_service_1.userService
            .logout(req.data, req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    upload(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .upload(req, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    cosnstantApi(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .constantData(req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    notification(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .notification(req, res)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
    getImageFromS3(req, res, next) {
        user_service_1.userService
            .getImageFromS3(req, res)
            .then((result) => {
            return result;
        })
            .catch(next);
    }
    follow(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .follow(req, req.user)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
    followerList(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .getUserFollowList(req)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
    followingList(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .getUserFollowList(req)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
    unfollow(req, res, next) {
        // console.info("req",req)
        user_service_1.userService
            .unfollow(req, req.user)
            .then((result) => {
            // console.info("res",res)
            res.success('Success', result);
        })
            .catch(next);
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Register User',
        summary: 'Register User',
        path: '/register',
        parameters: {
            body: {
                description: 'Register',
                required: true,
                model: 'UserRegister',
            },
        },
        security: {
            basicAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Verify your OTP sent to provided phone nunber',
        summary: 'Verify Phone Number with OTP',
        path: '/verify-otp',
        parameters: {
            body: {
                description: 'Verify OTP Code',
                required: true,
                model: 'VerifyOtpData',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyOtp", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Resend OTP code to provided email/phone nunber',
        path: '/resend-otp',
        summary: 'Resend OTP Code',
        parameters: {
            body: {
                description: 'Resend Otp Code',
                required: false,
                model: 'ResendOtpData',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "resendOtp", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'User Login',
        summary: 'Login Users',
        path: '/login',
        parameters: {
            body: {
                description: 'Login',
                required: true,
                model: 'UserLogin',
            },
        },
        security: {
            basicAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Forgot Password',
        summary: 'Forgot Password',
        path: '/forgot-password',
        parameters: {
            body: {
                description: 'Forgot Password',
                required: true,
                model: 'ForgotPasswordData',
            },
        },
        security: {
            basicAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'reset password',
        summary: 'reset password',
        path: '/reset-password',
        parameters: {
            body: {
                description: 'reset password',
                required: true,
                model: 'resetPassword',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Change Password',
        summary: 'Change Password',
        path: '/change-password',
        parameters: {
            body: {
                description: 'Change Password',
                required: true,
                model: 'ChangePasswordData',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPut)({
        description: 'Update User Data',
        summary: 'Update User Data',
        path: '/updateUserData',
        parameters: {
            body: {
                description: 'Update User Data',
                required: true,
                model: 'UpdateUserData',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserData", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Logout User',
        summary: 'Logout User',
        path: '/logout',
        parameters: {
            body: {
                description: 'Logout',
                required: true,
                model: 'LogoutData',
            },
        },
        security: {
            basicAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Upload File ',
        summary: 'Upload File',
        path: '/upload',
        parameters: {
            body: {
                description: 'Upload File',
                required: true,
                model: 'UploadData',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "upload", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Get User Constants ',
        summary: 'Get User Constants',
        path: '/getConstant',
        parameters: {},
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "cosnstantApi", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Send Notification ',
        summary: 'Send Notification',
        path: '/notification',
        parameters: {},
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "notification", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Get User Profile Image ',
        summary: 'Get User Image',
        path: '/file/:bucketPath?/:fileName',
        parameters: {},
        responses: {
            200: {
                description: 'Success',
                type: 'Image',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getImageFromS3", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Follow User',
        summary: 'Follow User',
        path: '/follow',
        parameters: {
            body: {
                description: 'Follow User',
                required: true,
                model: 'FollowUser',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "follow", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Follower List',
        summary: 'Follower List',
        path: '/followers/{_id}',
        parameters: {
            path: {
                _id: {
                    required: true,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
                    description: 'mongoID',
                },
            },
            query: {
                page: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Page No',
                    default: 1,
                },
                limit: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Limit',
                    default: 5,
                },
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "followerList", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Following List',
        summary: 'Following List',
        path: '/following/{_id}',
        parameters: {
            path: {
                _id: {
                    required: true,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
                    description: 'mongoID',
                },
            },
            query: {
                page: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Page No',
                    default: 1,
                },
                limit: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Limit',
                    default: 5,
                },
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "followingList", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Unfollow User',
        summary: 'Unfollow User',
        path: '/unfollow',
        parameters: {
            body: {
                description: 'Unfollow User',
                required: true,
                model: 'FollowUser',
            },
        },
        security: {
            bearerAuth: [],
        },
        responses: {
            200: {
                description: 'Success',
                type: 'String',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "unfollow", null);
UserController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/users',
        name: 'User Module',
    })
    /**
     * @description A controller to control user requests
     */
], UserController);
exports.userController = new UserController();
