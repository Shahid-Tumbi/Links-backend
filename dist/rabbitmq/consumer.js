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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = void 0;
const post_model_1 = require("../app/api/post/post.model");
const user_1 = require("../app/api/user");
const user_constants_1 = require("../app/api/user/user.constants");
const gptworker_utl_1 = require("../utils/gptworker.utl");
const amqp = require("amqplib");
const { notificationUtil } = require('../utils/notification.util');
function taskConsume(queueName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const consumerQueue = queueName;
            const connection = yield amqp.connect("amqp://localhost:5672");
            const channel = yield connection.createChannel();
            yield channel.assertQueue(consumerQueue, { durable: true });
            channel.consume(consumerQueue, (payload) => __awaiter(this, void 0, void 0, function* () {
                const message = JSON.parse(payload.content.toString());
                if (queueName == user_constants_1.QueueName.notification) {
                    yield notificationUtil(message);
                }
                if (queueName == user_constants_1.QueueName.follow) {
                    //  console.log('Received ',message);
                    yield user_1.UserDetailModel.findOneAndUpdate({ userId: message.followerId.toString() }, { $inc: { totalFollowings: 1 } }); // Increment the totalFollowers field by 1
                    yield user_1.UserDetailModel.findOneAndUpdate({ userId: message.followingId.toString() }, { $inc: { totalFollowers: 1 } }); // Increment the totalFollowers field by 1
                }
                if (queueName == user_constants_1.QueueName.unfollow) {
                    yield user_1.UserDetailModel.findOneAndUpdate({ userId: message.followerId.toString() }, { $inc: { totalFollowings: -1 } });
                    yield user_1.UserDetailModel.findOneAndUpdate({ userId: message.followingId.toString() }, { $inc: { totalFollowers: -1 } });
                }
                if (queueName == user_constants_1.QueueName.gptprocess) {
                    yield (0, gptworker_utl_1.default)(message);
                }
                if (queueName == user_constants_1.QueueName.like) {
                    const postId = message.postId;
                    const userId = message.userId;
                    const existingDislike = yield post_model_1.DislikeModel.findOne({ postId, userId });
                    if (existingDislike) {
                        yield post_model_1.DislikeModel.findByIdAndDelete({ _id: existingDislike._id });
                        yield post_model_1.PostModel.findByIdAndUpdate({ _id: postId }, { $inc: { dislikes: -1 } });
                    }
                    yield post_model_1.PostModel.findByIdAndUpdate({ _id: postId }, { $inc: { likes: 1 } });
                }
                if (queueName == user_constants_1.QueueName.dislike) {
                    const postId = message.postId;
                    const userId = message.userId;
                    const existingLike = yield post_model_1.LikeModel.findOne({ postId, userId });
                    if (existingLike) {
                        yield post_model_1.LikeModel.findByIdAndDelete({ _id: existingLike._id });
                        yield post_model_1.PostModel.findByIdAndUpdate({ _id: postId }, { $inc: { likes: -1 } });
                    }
                    yield post_model_1.PostModel.findByIdAndUpdate({ _id: postId }, { $inc: { dislikes: 1 } });
                }
                channel.ack(payload);
            }));
            console.log(`Waiting for messages...`);
        }
        catch (ex) {
            console.error(ex);
            throw new Error(ex);
        }
    });
}
exports.consumer = taskConsume;
