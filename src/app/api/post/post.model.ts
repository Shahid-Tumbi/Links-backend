import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';
import { COLLECTION_NAME } from '../api.constants';

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
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
    tags : {
      type: Array
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
    mod_review : { type: Boolean, default: false },
    commentsEnable : { type: Boolean, default: false },
    readingTime: { type: Schema.Types.Number , default: 0},
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true });
export const PostModel = model<IPost.Doc>(COLLECTION_NAME.post, postSchema);

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
  },
  { timestamps: true });
export const LikeModel = model<IPost.Like>(COLLECTION_NAME.like, likeSchema);
const dislikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
  },
  { timestamps: true });
export const DislikeModel = model<IPost.Like>(COLLECTION_NAME.dislike, dislikeSchema);

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      index:true
    },
    content: {
      type: String,
      max: 500,
    },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true });
export const CommentModel = model<IPost.Comment>(COLLECTION_NAME.comment, commentSchema);

const shareSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:true
    },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true });
export const ShareModel = model<IPost.Share>(COLLECTION_NAME.share, shareSchema);