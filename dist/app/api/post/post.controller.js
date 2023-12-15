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
exports.postController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const post_service_1 = require("./post.service");
let PostController = 
/**
 * @description A controller to control user requests
 */
class PostController {
    create(req, res, next) {
        post_service_1.postService
            .createPost(req.body)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    getPostDetail(req, res, next) {
        post_service_1.postService
            .postDetail(req, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    update(req, res, next) {
        post_service_1.postService
            .updatePost(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    delete(req, res, next) {
        post_service_1.postService
            .deletePost(req.data, req.client)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    getList(req, res, next) {
        post_service_1.postService
            .postList(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    likePost(req, res, next) {
        post_service_1.postService
            .likePost(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    dislikePost(req, res, next) {
        post_service_1.postService
            .dislikePost(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    commentPost(req, res, next) {
        post_service_1.postService
            .commentPost(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    commentUpdate(req, res, next) {
        post_service_1.postService
            .commentUpdate(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    deleteComment(req, res, next) {
        post_service_1.postService
            .deleteComment(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    getCommentList(req, res, next) {
        post_service_1.postService
            .commentList(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    sharePost(req, res, next) {
        post_service_1.postService
            .sharePost(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
    getUserWiseList(req, res, next) {
        post_service_1.postService
            .getUserWiseList(req)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Create Post',
        summary: 'Create Post',
        path: '/create',
        parameters: {
            body: {
                description: 'Create',
                required: true,
                model: 'CreatePost',
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
], PostController.prototype, "create", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Post Detail',
        summary: 'Post Detail',
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
], PostController.prototype, "getPostDetail", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPut)({
        description: 'Update Post',
        summary: 'Update Post',
        path: '/update/{_id}',
        parameters: {
            body: {
                description: 'Update',
                required: true,
                model: 'UpdatePost',
            },
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
], PostController.prototype, "update", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationDelete)({
        description: 'Delete Post',
        summary: 'Delete Post',
        path: '/delete/{_id}',
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
], PostController.prototype, "delete", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Post List',
        summary: 'Post List',
        path: '/',
        parameters: {
            query: {
                page: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Page No',
                    default: 1,
                },
                limit: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Limit',
                    default: 5,
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
], PostController.prototype, "getList", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Like Post',
        summary: 'Like Post',
        path: '/like',
        parameters: {
            body: {
                description: 'Create',
                required: true,
                model: 'LikePost',
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
], PostController.prototype, "likePost", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Dislike Post',
        summary: 'Dislike Post',
        path: '/dislike',
        parameters: {
            body: {
                description: 'Create',
                required: true,
                model: 'LikePost',
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
], PostController.prototype, "dislikePost", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Comment Post',
        summary: 'Comment Post',
        path: '/comment',
        parameters: {
            body: {
                description: 'Create',
                required: true,
                model: 'CommentPost',
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
], PostController.prototype, "commentPost", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPut)({
        description: 'Comment Update',
        summary: 'Comment Update',
        path: '/comment/{_id}',
        parameters: {
            body: {
                description: 'Update comment',
                required: true,
                model: 'CommentUpdate',
            },
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
], PostController.prototype, "commentUpdate", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationDelete)({
        description: 'Comment Delete',
        summary: 'Comment Delete',
        path: '/comment/{_id}',
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
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        description: 'Comment List',
        summary: 'Comment List',
        path: '/comment/{_id}',
        parameters: {
            path: {
                _id: {
                    required: true,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
                    description: 'postId',
                },
            },
            query: {
                page: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Page No',
                    default: 1,
                },
                limit: {
                    required: false,
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.NUMBER,
                    description: 'Limit',
                    default: 5,
                },
                parentId: {
                    required: false,
                    description: 'Parent comment Id (if it is replied comment)',
                    type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
                    default: '5erre5-refd45yuyu-dsdsfd-43fdd',
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
], PostController.prototype, "getCommentList", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Share Post',
        summary: 'Share Post',
        path: '/share',
        parameters: {
            body: {
                description: 'Share post',
                required: true,
                model: 'SharePost',
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
], PostController.prototype, "sharePost", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        description: 'Get Users wise Post List',
        summary: 'Get Users wise Post List',
        path: '/userWiseList/{_id}',
        parameters: {},
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
], PostController.prototype, "getUserWiseList", null);
PostController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/posts',
        name: 'Post Module',
    })
    /**
     * @description A controller to control user requests
     */
], PostController);
exports.postController = new PostController();
