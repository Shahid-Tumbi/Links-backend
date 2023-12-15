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
exports.SharePost = exports.CommentUpdate = exports.CommentPost = exports.LikePost = exports.UpdatePost = exports.CreatePost = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
let CreatePost = class CreatePost {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'User Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], CreatePost.prototype, "userId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post title',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'First post',
    }),
    __metadata("design:type", String)
], CreatePost.prototype, "title", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post content',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'content description',
    }),
    __metadata("design:type", String)
], CreatePost.prototype, "content", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'link that you want to share in post',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'https://www.google.com',
    }),
    __metadata("design:type", String)
], CreatePost.prototype, "link", void 0);
CreatePost = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Post Create',
        name: 'CreatePost',
    })
], CreatePost);
exports.CreatePost = CreatePost;
let UpdatePost = class UpdatePost {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post title',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'First post',
    }),
    __metadata("design:type", String)
], UpdatePost.prototype, "title", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post content',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'content description',
    }),
    __metadata("design:type", String)
], UpdatePost.prototype, "content", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'link that you want to share in post',
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'https://www.google.com',
    }),
    __metadata("design:type", String)
], UpdatePost.prototype, "link", void 0);
UpdatePost = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Post detail',
        name: 'UpdatePost',
    })
], UpdatePost);
exports.UpdatePost = UpdatePost;
let LikePost = class LikePost {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'User Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], LikePost.prototype, "userId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], LikePost.prototype, "postId", void 0);
LikePost = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Post like',
        name: 'LikePost',
    })
], LikePost);
exports.LikePost = LikePost;
let CommentPost = class CommentPost {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'User Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], CommentPost.prototype, "userId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], CommentPost.prototype, "postId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Parent comment Id (if it is replied comment)',
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], CommentPost.prototype, "parentId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Comment content',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'content description',
    }),
    __metadata("design:type", String)
], CommentPost.prototype, "content", void 0);
CommentPost = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Comment on Post',
        name: 'CommentPost',
    })
], CommentPost);
exports.CommentPost = CommentPost;
let CommentUpdate = class CommentUpdate {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Comment content',
        required: false,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: 'content description',
    }),
    __metadata("design:type", String)
], CommentUpdate.prototype, "content", void 0);
CommentUpdate = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Update Comment on Post',
        name: 'CommentUpdate',
    })
], CommentUpdate);
exports.CommentUpdate = CommentUpdate;
let SharePost = class SharePost {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'User Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], SharePost.prototype, "userId", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'Post Id',
        required: true,
        type: swagger_express_ts_1.SwaggerDefinitionConstant.STRING,
        example: '5erre5-refd45yuyu-dsdsfd-43fdd',
    }),
    __metadata("design:type", String)
], SharePost.prototype, "postId", void 0);
SharePost = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Share Post',
        name: 'SharePost',
    })
], SharePost);
exports.SharePost = SharePost;
