"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userV1Routes = void 0;
const express_1 = require("express");
const constants_1 = require("../../constants");
const middlewares_1 = require("../../middlewares");
const user_controller_1 = require("./user.controller");
const user_validators_1 = require("./user.validators");
// Create router
const router = (0, express_1.Router)();
router.post('/register', (0, middlewares_1.session)([constants_1.UserType.Default]), user_validators_1.userValidators.register, user_controller_1.userController.register);
router.post('/verify-otp', (0, middlewares_1.session)([constants_1.UserType.User]), user_validators_1.userValidators.verifyOtp, user_controller_1.userController.verifyOtp);
router.post('/resend-otp', (0, middlewares_1.session)([constants_1.UserType.User]), user_controller_1.userController.resendOtp);
router.post('/login', (0, middlewares_1.session)([constants_1.UserType.Default]), user_validators_1.userValidators.login, user_controller_1.userController.login);
router.put('/updateUserData/:_id', (0, middlewares_1.session)([constants_1.UserType.User]), user_validators_1.userValidators.updateUserData, user_validators_1.userValidators.updateUserDataSchemas, user_controller_1.userController.updateUserData);
router.post('/forgot-password', (0, middlewares_1.session)([constants_1.UserType.Default]), user_validators_1.userValidators.forgotPassword, user_controller_1.userController.forgotPassword);
router.post('/change-password', (0, middlewares_1.session)([constants_1.UserType.User]), user_validators_1.userValidators.changePassword, user_controller_1.userController.changePassword);
router.post('/logout', (0, middlewares_1.session)([constants_1.UserType.Default]), user_validators_1.userValidators.logout, user_controller_1.userController.logout);
router.post('/upload', (0, middlewares_1.session)([constants_1.UserType.User]), user_controller_1.userController.upload);
router.post('/notification', (0, middlewares_1.session)([constants_1.UserType.User]), user_controller_1.userController.notification);
router.get('/file/:bucketPath?/:fileName', (0, middlewares_1.session)([constants_1.UserType.User]) ||
    (0, middlewares_1.adminSession)([constants_1.UserType.Admin]) ||
    (0, middlewares_1.session)([constants_1.UserType.Default]), user_controller_1.userController.getImageFromS3);
//Followers management Module 
router.post('/follow', (0, middlewares_1.session)([constants_1.UserType.User]), user_validators_1.userValidators.follow, user_controller_1.userController.follow);
router.get('/followers/:_id', (0, middlewares_1.session)([constants_1.UserType.User]), user_controller_1.userController.followerList);
router.get('/following/:_id', (0, middlewares_1.session)([constants_1.UserType.User]), user_controller_1.userController.followingList);
router.post('/unfollow', (0, middlewares_1.session)([constants_1.UserType.User]), user_validators_1.userValidators.follow, user_controller_1.userController.unfollow);
router.post('/reset-password', (0, middlewares_1.session)([constants_1.UserType.Default]), user_validators_1.userValidators.resetPassword, user_controller_1.userController.resetPassword);
exports.userV1Routes = { path: '/users', router };
