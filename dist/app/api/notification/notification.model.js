"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const api_constants_1 = require("../api.constants");
const notificationSchema = new mongoose_1.Schema({
    notificationType: { type: mongoose_1.Schema.Types.Number, required: false, index: true },
    toUser: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: true },
    fromUser: { type: mongoose_1.Schema.Types.ObjectId, required: false, index: true },
    content: { type: mongoose_1.Schema.Types.String, required: true, index: true },
    createdAt: { type: mongoose_1.Schema.Types.Date, required: false, index: true },
    title: { type: mongoose_1.Schema.Types.String, required: true, index: true },
}, {
    timestamps: true,
    collection: api_constants_1.COLLECTION_NAME.notification,
});
exports.NotificationModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.notification, notificationSchema);
