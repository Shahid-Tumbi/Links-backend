"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const utils_1 = require("../../../utils");
const notification_model_1 = require("./notification.model");
const database_1 = require("../../../database");
const mongodb_1 = require("mongodb");
const cron_1 = require("cron");
const post_model_1 = require("../post/post.model");
const rabbitmq_1 = require("../../../rabbitmq");
const user_constants_1 = require("../user/user.constants");
const notification_constants_1 = require("./notification.constants");
const user_1 = require("../user");
class NotificationService {
    constructor() {
        this.Model = notification_model_1.NotificationModel;
        this.job = new cron_1.CronJob('0 0 * * *', () => {
            this.pushNotification();
        }).start();
    }
    register(_a, client) {
        var data = __rest(_a, []);
        return __awaiter(this, void 0, void 0, function* () {
            try {
                utils_1.Console.info(`partial ${JSON.stringify(client)}`);
                let result = yield this.Model.create(Object.assign({}, data));
                return result;
            }
            catch (error) {
                utils_1.Console.error('Error in regsiteration service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    notificationList(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    {
                        $match: {},
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                ];
                if (payload.toUser) {
                    let toUser = new mongodb_1.ObjectId(payload.toUser);
                    pipeline[0].$match['$and'] = pipeline[0].$match['$and'] ? pipeline[0].$match['$and'] : [];
                    pipeline[0].$match['$and'] = [...pipeline[0].$match['$and'], ...[{ toUser: toUser }]];
                }
                // console.log("payload.userId",payload.userId)
                //   console.log("PAIPELINE",JSON.stringify(pipeline))
                return yield database_1.DAO.paginateWithNextHit(notification_model_1.NotificationModel, pipeline, payload.limit, payload.page);
            }
            catch (error) {
                utils_1.Console.error('Error in admin login service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    deleteNotification(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield notification_model_1.NotificationModel.remove({ _id: payload._id });
            }
            catch (error) {
                utils_1.Console.error('Error in admin fetchPhotographerDetail service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    pushNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    {
                        $match: {
                            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000) },
                        },
                    },
                    { $sort: { 'createdAt': -1 } },
                    {
                        $lookup: {
                            from: 'likes',
                            localField: '_id',
                            foreignField: 'postId',
                            as: 'likes',
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            content: 1,
                            createdAt: 1,
                            userId: 1,
                            likeCount: { $size: '$likes' },
                        },
                    },
                ];
                const postsWithLikes = yield post_model_1.PostModel.aggregate(pipeline);
                for (const post of postsWithLikes) {
                    if (post.likeCount > 1) {
                        const userId = post.userId;
                        const user = yield user_1.User.findOne({ _id: userId });
                        if (user && user.deviceToken) {
                            try {
                                notification_model_1.NotificationModel.create({
                                    toUser: post.userId,
                                    notificationType: 0,
                                    content: post.likeCount + ' ' +
                                        notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TOTAL,
                                    title: notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
                                });
                                (0, rabbitmq_1.producer)({
                                    token: user.deviceToken,
                                    notification: {
                                        title: notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
                                        body: post.likeCount + ' ' +
                                            notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TOTAL,
                                    },
                                    id: postsWithLikes._id,
                                }, user_constants_1.QueueName.notification);
                                (0, rabbitmq_1.consumer)(user_constants_1.QueueName.notification);
                            }
                            catch (err) {
                                return err;
                            }
                        }
                    }
                }
            }
            catch (error) {
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
}
exports.notificationService = new NotificationService();
