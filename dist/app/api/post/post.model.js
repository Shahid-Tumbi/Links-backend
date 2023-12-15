"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareModel = exports.CommentModel = exports.DislikeModel = exports.LikeModel = exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const api_constants_1 = require("../api.constants");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        max: 500,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    gpt_summary: {
        type: String,
    },
    tags: {
        type: Array
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    pinComment: {
        type: String,
        max: 60
    },
    discription: {
        type: String,
    },
    mod_review: { type: Boolean, default: false },
    commentsEnable: { type: Boolean, default: false },
    readingTime: { type: mongoose_1.Schema.Types.Number, default: 0 },
    is_deleted: { type: Boolean, default: false },
    postPublished: { type: mongoose_1.Schema.Types.Date }
}, { timestamps: true });
exports.PostModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.post, postSchema);
const likeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
}, { timestamps: true });
exports.LikeModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.like, likeSchema);
const dislikeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
}, { timestamps: true });
exports.DislikeModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.dislike, dislikeSchema);
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        index: true
    },
    content: {
        type: String,
        max: 500,
    },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.comment, commentSchema);
const shareSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.ShareModel = (0, mongoose_1.model)(api_constants_1.COLLECTION_NAME.share, shareSchema);
