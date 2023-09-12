import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './post.constants';
import { IPost } from './post.interface';

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
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