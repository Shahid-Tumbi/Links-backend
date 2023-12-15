"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const constants_1 = require("../../constants");
const middlewares_1 = require("../../middlewares");
const notification_controller_1 = require("./notification.controller");
const notification_validators_1 = require("./notification.validators");
// Create router
const router = (0, express_1.Router)();
router.post('/addNotification', (0, middlewares_1.session)([constants_1.UserType.User]), notification_validators_1.notificationValidators.Notification, notification_controller_1.notificationController.addNotification);
router.post('/notificationList', (0, middlewares_1.session)([constants_1.UserType.User]), notification_validators_1.notificationValidators.listNotification, notification_controller_1.notificationController.notificationList);
router.delete('/:_id', (0, middlewares_1.session)([constants_1.UserType.User]), notification_validators_1.notificationValidators.deleteNotification, notification_controller_1.notificationController.deleteNotification);
exports.notificationRoutes = { path: '/notification', router };
