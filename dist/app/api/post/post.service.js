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
exports.postService = void 0;
const utils_1 = require("../../../utils");
const post_model_1 = require("./post.model");
const post_constants_1 = require("./post.constants");
const database_1 = require("../../../database");
const user_1 = require("../user");
const user_constants_1 = require("../user/user.constants");
const mongodb_1 = require("mongodb");
const rabbitmq_1 = require("../../../rabbitmq");
const notification_1 = require("../notification");
const notification_constants_1 = require("../notification/notification.constants");
const axios = require('axios');
const contentTypeParser = require('content-type');
class PostService {
    constructor() {
        this.Model = post_model_1.PostModel;
        this.UserModel = user_1.User;
    }
    /**
     * Creates a new post in the database.
     * @param data - An object of type ICreatePostData containing the necessary data to create a new post.
     * @returns The newly created post object if the creation is successful. Otherwise, a rejected promise with a ResponseError object containing the error details.
     */
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.findById(data.userId);
                if (!user) {
                    return Promise.reject(new utils_1.ResponseError(422, user_constants_1.USER_MESSAGES.USER_NOT_FOUND));
                }
                if (!(0, utils_1.isValidURL)(data.link)) {
                    return Promise.reject(new utils_1.ResponseError(422, post_constants_1.POST_MESSAGES.INVALID_LINK_TYPE));
                }
                const response = yield axios.get(data.link).catch((error) => {
                    console.error('An error occurred:', error);
                    throw error;
                });
                const contentType = response.headers['content-type'];
                const { type } = contentTypeParser.parse(contentType);
                if (type === 'text/html') {
                    const postCreated = yield this.Model.create(Object.assign({}, data));
                    utils_1.DbLogger.info('Gpt process start');
                    (0, rabbitmq_1.producer)({ postId: postCreated._id, postData: response.data, link: data.link }, user_constants_1.QueueName.gptprocess);
                    (0, rabbitmq_1.consumer)(user_constants_1.QueueName.gptprocess);
                    return postCreated;
                }
                else {
                    console.log('URL does not point to an HTML page');
                    return Promise.reject(new utils_1.ResponseError(422, post_constants_1.POST_MESSAGES.INVALID_LINK_TYPE));
                }
            }
            catch (error) {
                console.error('Error in post create service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Retrieves the details of a specific post from the database.
     * @param req - The request object containing the post ID in the `params` property.
     * @param client - The client object containing the client's IP address in the `ipAddress` property.
     * @returns A promise that resolves with the post object if it is found in the database. Otherwise, rejects with a `ResponseError` object containing the error message "No Data Found !!".
     */
    postDetail(req, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.Model.findById({ _id: req.params._id });
                if (!post) {
                    return Promise.reject(new utils_1.ResponseError(422, post_constants_1.POST_MESSAGES.DATA_NOT_FOUND));
                }
                return post;
            }
            catch (error) {
                console.error('Error in post detail service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Updates a post in the database.
     * @param payload - An object containing the updated post data, including the post ID, title, content, and image.
     * @param client - An object containing the client's IP address.
     * @returns A promise that resolves with the updated post object if the update is successful.
     *          If an error occurs during the update process, a rejected promise is returned with a `ResponseError` object containing the error details.
     */
    updatePost(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPost = yield this.Model.findByIdAndUpdate({ _id: payload._id }, { $set: payload }, { new: true });
                if (!updatedPost) {
                    return post_constants_1.POST_MESSAGES.NO_POST_FOUND;
                }
                return updatedPost;
            }
            catch (error) {
                console.error('Error in user Update post service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Deletes a post from the database.
     * @param payload - An object containing the post ID to be deleted.
     * @param client - An object containing the client's information, including the IP address.
     * @returns A promise that resolves with the updated post object if the deletion is successful. If an error occurs, the promise is rejected with a `ResponseError` object containing the error details.
     */
    deletePost(payload, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPost = yield this.Model.findByIdAndUpdate({ _id: payload._id }, { $set: { is_deleted: true } });
                return deletedPost;
            }
            catch (error) {
                console.error('Error in user delete post service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Retrieves a list of posts from the database.
     * @param req - The request object containing the pagination options.
     * @returns The paginated list of posts from the database.
     */
    postList(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || 1;
                const limit = parseInt((_b = req.query.limit) === null || _b === void 0 ? void 0 : _b.toString()) || 10;
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);
                const todayEnd = new Date();
                todayEnd.setHours(23, 59, 59, 999);
                const pipeline = [
                    {
                        $match: {
                            is_deleted: false,
                            $or: [
                                { createdAt: { $gte: todayStart, $lte: todayEnd } },
                                { createdAt: { $lt: todayStart } },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            isToday: { $gte: ["$createdAt", todayStart] },
                        },
                    },
                    { $sort: { isToday: -1, likes: -1, createdAt: -1 } },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "postId",
                            as: "post_comments",
                        },
                    },
                    {
                        $addFields: {
                            totalComments: { $size: "$post_comments" }, // Calculate total comments for each post
                        },
                    },
                    {
                        $lookup: {
                            from: "user",
                            localField: "userId",
                            foreignField: "_id",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        name: 1,
                                        profileImage: 1
                                    },
                                },
                            ],
                            as: "user_info",
                        },
                    },
                    { $unwind: "$user_info" },
                    {
                        $project: {
                            tags: 0,
                            isToday: 0,
                            post_comments: 0,
                        },
                    },
                ];
                return yield database_1.DAO.paginateWithNextHit(this.Model, pipeline, limit, page);
            }
            catch (error) {
                console.error('Error in post list service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * This method is used to like a post. It checks if the rating provided is within the valid range (0 to 10).
     * If the rating is valid, it checks if the user has already liked the post. If the like already exists,
     * it updates the rating. If the like does not exist, it creates a new like.
     * @param req - The request object containing the post ID, user ID, and rating.
     * @returns The updated or newly created like object.
     * @throws ResponseError if the rating is invalid.
     */
    likePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, userId } = req.body;
                const existingLike = yield post_model_1.LikeModel.findOne({ postId, userId });
                if (existingLike) {
                    return Promise.reject(new utils_1.ResponseError(422, post_constants_1.POST_MESSAGES.ALREADY_LIKED));
                }
                const result = yield post_model_1.LikeModel.create(req.body);
                (0, rabbitmq_1.producer)({ postId, userId }, user_constants_1.QueueName.like);
                (0, rabbitmq_1.consumer)(user_constants_1.QueueName.like);
                const postOwnerData = yield post_model_1.PostModel.findOne({ _id: postId });
                const userData = yield this.UserModel.findOne({ _id: userId });
                notification_1.NotificationModel.create({
                    fromUser: userId,
                    toUser: postOwnerData.userId,
                    notificationType: 0,
                    content: userData.name + ' ' +
                        notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.MESSAGE,
                    title: notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
                });
                try {
                    (0, rabbitmq_1.producer)({
                        token: userData.deviceToken,
                        notification: {
                            title: notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
                            body: userData.name + ' ' +
                                notification_constants_1.NOTIFICATION_MESSAGES.POST.LIKED.MESSAGE,
                        },
                        id: postId,
                    }, user_constants_1.QueueName.notification);
                    (0, rabbitmq_1.consumer)(user_constants_1.QueueName.notification);
                }
                catch (err) {
                    return err;
                }
                return result;
            }
            catch (error) {
                console.error('Error in post like service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Dislikes a post.
     *
     * @param req - The request object containing the postId and userId.
     * @returns A promise that resolves with the newly created dislike record or rejects with an error if the user has already disliked the post.
     */
    dislikePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, userId } = req.body;
                const existingDislike = yield post_model_1.DislikeModel.findOne({ postId, userId });
                if (existingDislike) {
                    return Promise.reject(new utils_1.ResponseError(422, post_constants_1.POST_MESSAGES.ALREADY_DISLIKED));
                }
                const result = yield post_model_1.DislikeModel.create(req.body);
                (0, rabbitmq_1.producer)({ postId, userId }, user_constants_1.QueueName.dislike);
                (0, rabbitmq_1.consumer)(user_constants_1.QueueName.dislike);
                return result;
            }
            catch (error) {
                console.error('Error in post dislike service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Creates a new comment for a post.
     * @param req - The request object containing the comment data.
     * @returns The newly created comment.
     * @throws {ResponseError} If there is an error creating the comment.
     */
    commentPost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, userId } = req.body;
                const result = yield post_model_1.CommentModel.create(req.body);
                const postOwnerData = yield post_model_1.PostModel.findOne({ _id: postId });
                const userData = yield this.UserModel.findOne({ _id: userId });
                notification_1.NotificationModel.create({
                    fromUser: userId,
                    toUser: postOwnerData.userId,
                    notificationType: 0,
                    content: userData.name + ' ' +
                        notification_constants_1.NOTIFICATION_MESSAGES.POST.COMMENT.MESSAGE,
                    title: notification_constants_1.NOTIFICATION_MESSAGES.POST.COMMENT.TITLE,
                });
                try {
                    (0, rabbitmq_1.producer)({
                        token: userData.deviceToken,
                        notification: {
                            title: notification_constants_1.NOTIFICATION_MESSAGES.POST.COMMENT.TITLE,
                            body: userData.name + ' ' +
                                notification_constants_1.NOTIFICATION_MESSAGES.POST.COMMENT.MESSAGE,
                        },
                        id: postId,
                    }, user_constants_1.QueueName.notification);
                    (0, rabbitmq_1.consumer)(user_constants_1.QueueName.notification);
                }
                catch (err) {
                    return err;
                }
                return result;
            }
            catch (error) {
                console.error('Error in post create service', error);
                throw new utils_1.ResponseError(422, error);
            }
        });
    }
    /**
     * Updates a comment in the database.
     * @param req - The request object containing the comment ID in the `params` property and the updated comment data in the `body` property.
     * @returns The updated comment object.
     * @throws {ResponseError} If there is an error in the comment update service.
     */
    commentUpdate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield post_model_1.CommentModel.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body }, { new: true });
                return comment;
            }
            catch (error) {
                console.error('Error in comment update service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    /**
     * Deletes a comment by updating the `is_deleted` field of the comment document to `true`.
     * @param req - The request object containing the comment ID in the `params` property.
     * @returns The deleted comment document.
     * @throws {ResponseError} If there is an error in the comment delete service.
     */
    deleteComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedComment = yield post_model_1.CommentModel.findByIdAndUpdate(req.params._id, { is_deleted: true }, { new: true });
                return deletedComment;
            }
            catch (error) {
                console.error('Error in comment delete service', error);
                throw new utils_1.ResponseError(422, error);
            }
        });
    }
    /**
     * Retrieves a list of comments for a specific post.
     * Uses pagination to limit the number of comments returned per page and sorts them in descending order based on their creation date.
     *
     * @param req - The request object containing the post ID and optional parent ID.
     * @returns A paginated list of comments for the specified post, sorted in descending order based on their creation date.
     * @throws {ResponseError} If there is an error in the service.
     */
    commentList(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const parentId = req.query.parentId;
                const page = parseInt((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || 1;
                const limit = parseInt((_b = req.query.limit) === null || _b === void 0 ? void 0 : _b.toString()) || 10;
                const pipeline = [
                    {
                        $match: Object.assign({ postId: new mongodb_1.ObjectId(_id), is_deleted: false }, (parentId && { parentId: new mongodb_1.ObjectId(parentId.toString()) })),
                    },
                    { $sort: { createdAt: -1 } },
                ];
                return yield database_1.DAO.paginateWithNextHit(post_model_1.CommentModel, pipeline, limit, page);
            }
            catch (error) {
                console.error('Error in comment list service', error);
                throw new utils_1.ResponseError(422, error);
            }
        });
    }
    /**
     * Creates a new share record in the database.
     *
     * @param req - The request object containing the userId and postId properties in the body.
     * @returns The newly created share record.
     */
    sharePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield post_model_1.ShareModel.create(req.body);
                return result;
            }
            catch (error) {
                console.error('Error in post share service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
    getUserWiseList(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const page = parseInt((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || 1;
                const limit = parseInt((_b = req.query.limit) === null || _b === void 0 ? void 0 : _b.toString()) || 10;
                const pipeline = [
                    {
                        $match: {
                            userId: new mongodb_1.ObjectId(_id),
                            is_deleted: false,
                        },
                    },
                    { $sort: { createdAt: -1 } },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "postId",
                            as: "post_comments",
                        },
                    },
                    {
                        $addFields: {
                            totalComments: { $size: "$post_comments" }, // Calculate total comments for each post
                        },
                    },
                    {
                        $project: {
                            tags: 0,
                            post_comments: 0,
                        },
                    },
                ];
                return yield database_1.DAO.paginateWithNextHit(this.Model, pipeline, limit, page);
            }
            catch (error) {
                console.error('Error in post list service', error);
                return Promise.reject(new utils_1.ResponseError(422, error));
            }
        });
    }
}
exports.postService = new PostService();
