import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './post.constants';
import { IPost } from './post.interface';
import { ratingRange } from '@src/app/constants';

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
    content: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    link: {
      type: String,
    },
    gpt_summary: {
      type: String,
    },
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
    rating: {
      type: Number,
      enum: Object.values(ratingRange),
      required: true,
    },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true });
export const LikeModel = model<IPost.Like>(COLLECTION_NAME.like, likeSchema);

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