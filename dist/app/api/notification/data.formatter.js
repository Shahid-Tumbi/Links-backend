"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewDataFormat = void 0;
// @@ getUserDataById() in user service should have same attributes
const ReviewDataFormat = (data) => {
    return {
        _id: data._id || '',
        fromUser: data.fromUser || '',
        toUser: data.toUser || '',
        notificationType: data.notificationType || '',
        content: data.content || '',
        title: data.title || '',
    };
};
exports.ReviewDataFormat = ReviewDataFormat;
