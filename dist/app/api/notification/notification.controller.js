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
exports.notificationController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const notification_service_1 = require("./notification.service");
let NotificationController = 
/**
 * @description A controller to control user requests
 */
class NotificationController {
    addNotification(req, res, next) {
        notification_service_1.notificationService
            .register(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    notificationList(req, res, next) {
        notification_service_1.notificationService
            .notificationList(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    deleteNotification(req, res, next) {
        notification_service_1.notificationService
            .deleteNotification(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Saved Notification',
        summary: 'Saved Notification',
        path: '/addNotification',
        parameters: {
            body: {
                description: 'Saved Notification',
                required: true,
                model: 'NotificationModel',
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
], NotificationController.prototype, "addNotification", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Notification Listing',
        summary: 'Notification Listing',
        path: '/notificationList',
        parameters: {
            body: {
                description: 'Notification Listing',
                required: true,
                model: 'NotificationModel',
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
], NotificationController.prototype, "notificationList", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationDelete)({
        description: 'Delete Notification',
        summary: 'Delete Notification',
        path: '/{_id}',
        parameters: {
            path: {
                _id: {
                    required: true,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
                    description: 'mongoID',
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
], NotificationController.prototype, "deleteNotification", null);
NotificationController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/notification',
        name: 'Notification Module',
    })
    /**
     * @description A controller to control user requests
     */
], NotificationController);
exports.notificationController = new NotificationController();
