"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiV1Routes = void 0;
const express_1 = require("express");
const api_1 = require("../middlewares/api");
const error_util_1 = require("../../utils/error.util");
const user_routes_1 = require("./user/user.routes");
const debug_util_1 = require("../../utils/debug.util");
const post_routes_1 = require("./post/post.routes");
const api_controller_1 = require("./api.controller");
const notification_routes_1 = require("./notification/notification.routes");
// create Router
const router = (0, express_1.Router)();
router.use(api_1.apiMiddleware);
router.get('/timeout', (req, res, next) => {
    // res.setTimeout(1000);
});
router.get('/privacy-policy', (req, res) => {
    res.render('TermsofService.html');
});
router.get('/config', api_controller_1.apiController.config);
router.use(user_routes_1.userV1Routes.path, user_routes_1.userV1Routes.router);
router.use(post_routes_1.postV1Routes.path, post_routes_1.postV1Routes.router);
router.use(notification_routes_1.notificationRoutes.path, notification_routes_1.notificationRoutes.router);
router.use((req, res, next) => {
    next(new error_util_1.ResponseError(404, 'Not Found'));
});
router.use((err, req, res, next) => {
    debug_util_1.apiDebugger.log(req, err);
    res.error(err);
});
exports.apiV1Routes = { path: '/v1', router };
