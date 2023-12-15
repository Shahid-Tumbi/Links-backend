import { App } from '@src/app/app.interface';
import {
  DbLogger,
	ResponseError,
  isValidURL,
} from '@src/utils';
import { CommentModel, DislikeModel, LikeModel, PostModel, ShareModel } from './post.model';
import { ICreatePostData, IDeletePostData,  IPost,  IPostDetail,  IUpdatePostData } from './post.interface';
import { POST_MESSAGES } from './post.constants';
import { DAO } from '@src/database';
import { User } from '../user';
import { QueueName, USER_MESSAGES } from '../user/user.constants';
import { ObjectId } from 'mongodb';
import { consumer, producer } from '@src/rabbitmq';
import { NotificationModel } from '../notification';
import { NOTIFICATION_MESSAGES } from '../notification/notification.constants';
import { NotificationType } from '@src/app/constants';
const axios = require('axios');
const contentTypeParser = require('content-type');

class PostService {
	readonly Model = PostModel;
	readonly UserModel = User;

    /**
     * Creates a new post in the database.
     * @param data - An object of type ICreatePostData containing the necessary data to create a new post.
     * @returns The newly created post object if the creation is successful. Otherwise, a rejected promise with a ResponseError object containing the error details.
     */
    async createPost(data: ICreatePostData) {
      try {
        const user = await this.UserModel.findById(data.userId)
        if (!user) {
          return Promise.reject(
            new ResponseError(422, USER_MESSAGES.USER_NOT_FOUND)
          )
        }
        if (!isValidURL(data.link)) {
          return Promise.reject(new ResponseError(422, POST_MESSAGES.INVALID_LINK_TYPE));
        }
        const response = await axios.get(data.link).catch((error: any) => {
          console.error('An error occurred:', error);
          throw error;
        });
        const contentType = response.headers['content-type'];
        const { type } = contentTypeParser.parse(contentType);
        if (type === 'text/html') {
          const postCreated = await this.Model.create({
            ...data
          });
          DbLogger.info('Gpt process start')
          producer({postId:postCreated._id,postData:response.data,link:data.link,userId:postCreated.userId},QueueName.gptprocess)
          consumer(QueueName.gptprocess)
          return postCreated;
        } else {
          console.log('URL does not point to an HTML page');
          return Promise.reject(new ResponseError(422, POST_MESSAGES.INVALID_LINK_TYPE));
        }
      } catch (error) {
        console.error('Error in post create service', error);
        return Promise.reject(new ResponseError(422, error));
      }
    }
    /**
     * Retrieves the details of a specific post from the database.
     * @param req - The request object containing the post ID in the `params` property.
     * @param client - The client object containing the client's IP address in the `ipAddress` property.
     * @returns A promise that resolves with the post object if it is found in the database. Otherwise, rejects with a `ResponseError` object containing the error message "No Data Found !!".
     */
    async postDetail(req:App.Request<IPostDetail>, client: Partial<App.Client>){
      try {
        const post =await this.Model.aggregate([
          {
            $match: {
              _id: new ObjectId(req.params._id)
            }
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
        ]);
    
        if (post.length === 0) {
          return Promise.reject(new ResponseError(404, POST_MESSAGES.DATA_NOT_FOUND));
        }
        return post[0]; 
      } catch (error) {
        console.error('Error in post detail service', error);
        return Promise.reject(new ResponseError(422, error));
      }
        
    }
    /**
     * Updates a post in the database.
     * @param payload - An object containing the updated post data, including the post ID, title, content, and image.
     * @param client - An object containing the client's IP address.
     * @returns A promise that resolves with the updated post object if the update is successful.
     *          If an error occurs during the update process, a rejected promise is returned with a `ResponseError` object containing the error details.
     */
    async updatePost(payload: IUpdatePostData, client: Partial<App.Client>) {
      try {
        const updatedPost = await this.Model.findByIdAndUpdate(
          { _id: payload._id },
          { $set: payload },
          { new: true }
        );
        if(!updatedPost){
          return POST_MESSAGES.NO_POST_FOUND
        }
        return updatedPost;
      } catch (error) {
        console.error('Error in user Update post service', error);
        return Promise.reject(new ResponseError(422, error));
      }
    }
    /**
     * Deletes a post from the database.
     * @param payload - An object containing the post ID to be deleted.
     * @param client - An object containing the client's information, including the IP address.
     * @returns A promise that resolves with the updated post object if the deletion is successful. If an error occurs, the promise is rejected with a `ResponseError` object containing the error details.
     */
    async deletePost(payload: IDeletePostData, client: Partial<App.Client>) {
      try {
        const deletedPost = await this.Model.findByIdAndUpdate(
          { _id: payload._id },
          { $set: { is_deleted: true } },
        );
        return deletedPost;
      } catch (error) {
        console.error('Error in user delete post service', error);
        return Promise.reject(new ResponseError(422, error));
      }
    }
    /**
     * Retrieves a list of posts from the database.
     * @param req - The request object containing the pagination options.
     * @returns The paginated list of posts from the database.
     */
    async postList(req: App.Request,{ id }: App.User) {
      try{
      const page = parseInt(req.query.page?.toString()) || 1;
      const limit = parseInt(req.query.limit?.toString()) || 10;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const pipeline = [
          {
            $match: {
              is_deleted: false,
              mod_review: true,
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
            $lookup: {
              from: "likes",
              let: { postId: "$_id", userId: new ObjectId(id) },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$postId", "$$postId"] },
                        { $eq: ["$userId", "$$userId"] }
                      ]
                    }
                  }
                },
                { $count: "liked" } // Count the number of likes for the user and post
              ],
              as: "userLikes"
            }
          },
          {
            $lookup: {
              from: "dislikes",
              let: { postId: "$_id", userId: new ObjectId(id) },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$postId", "$$postId"] },
                        { $eq: ["$userId", "$$userId"] }
                      ]
                    }
                  }
                },
                { $count: "disliked" } // Count the number of dislikes for the user and post
              ],
              as: "userDislikes"
            }
          },
          {
            $addFields: {
              isLikedByUser: { $gt: [{ $size: "$userLikes" }, 0] },
              isDislikedByUser: { $gt: [{ $size: "$userDislikes" }, 0] }
            }
          },
          {
            $project: {
              userLikes: 0, // Remove the userLikes array from the result
              userDislikes: 0 ,
              tags: 0,
              isToday: 0,
            },
          },
        ];
  
      return await DAO.paginateWithNextHit(this.Model, pipeline, limit, page);
      } 
        catch (error) {
          console.error('Error in post list service', error);
          return Promise.reject(new ResponseError(422, error));
        }
      }

    /**
     * This method is used to like a post. It checks if the rating provided is within the valid range (0 to 10).
     * If the rating is valid, it checks if the user has already liked the post. If the like already exists,
     * it updates the rating. If the like does not exist, it creates a new like.
     * @param req - The request object containing the post ID, user ID, and rating.
     * @returns The updated or newly created like object.
     * @throws ResponseError if the rating is invalid.
     */
    async likePost(req: App.Request<IPost.Like>) {
      try {
        const { postId, userId } = req.body;
        const existingLike = await LikeModel.findOne({ postId, userId });
        if (existingLike) {
          return Promise.reject(new ResponseError(422, POST_MESSAGES.ALREADY_LIKED));
        }
        const result = await LikeModel.create(req.body);
        producer({ postId, userId },QueueName.like)
        consumer(QueueName.like)
        const postOwnerData = await PostModel.findOne({_id:postId})
        const userData = await this.UserModel.findOne({_id:postOwnerData.userId})
        if(userId != postOwnerData.userId){
        NotificationModel.create({
          fromUser: userId,
          toUser: postOwnerData.userId,
          notificationType: NotificationType.Upvote,
          content: userData.name + ' ' +
          NOTIFICATION_MESSAGES.POST.LIKED.MESSAGE,
          title: NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
          postId
        });
        try {
          producer({
            token: userData.deviceToken,
  
            notification: {
              title: NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
              body: 
              userData.name + ' ' +
              NOTIFICATION_MESSAGES.POST.LIKED.MESSAGE,
            },
            id: postId,             
          },QueueName.notification);
          consumer(QueueName.notification);
        } catch (err) {
          return err;
        }
      }
        return result;
      } catch (error) {
          console.error('Error in post like service', error);
          return Promise.reject(new ResponseError(422, error));
        }
      }
    /**
     * Dislikes a post.
     * 
     * @param req - The request object containing the postId and userId.
     * @returns A promise that resolves with the newly created dislike record or rejects with an error if the user has already disliked the post.
     */
    async dislikePost(req: App.Request<IPost.Like>) {
      try {
        const { postId, userId } = req.body
        const existingDislike = await DislikeModel.findOne({ postId, userId });
  
        if (existingDislike) {
          return Promise.reject(new ResponseError(422, POST_MESSAGES.ALREADY_DISLIKED));
        }
        const result = await DislikeModel.create(req.body);
        producer({ postId, userId },QueueName.dislike)
        consumer(QueueName.dislike)
        return result;
      } catch (error) {
          console.error('Error in post dislike service', error);
          return Promise.reject(new ResponseError(422, error));
        }
      }
  
      /**
       * Creates a new comment for a post.
       * @param req - The request object containing the comment data.
       * @returns The newly created comment.
       * @throws {ResponseError} If there is an error creating the comment.
       */
      async commentPost(req: App.Request<IPost.Comment>): Promise<IPost.Comment> {
        try {
          const { postId, userId } = req.body;
          const result = await CommentModel.create(req.body);
          producer({ postId, userId },QueueName.comment)
          consumer(QueueName.comment)
          const postOwnerData = await PostModel.findOne({_id:postId})
          const userData = await this.UserModel.findOne({_id:userId})
          if(userId != postOwnerData.userId){
          NotificationModel.create({
            fromUser: userId,
            toUser: postOwnerData.userId,
            notificationType: NotificationType.Comment,
            content: userData.name + ' ' +
            NOTIFICATION_MESSAGES.POST.COMMENT.MESSAGE,
            title: NOTIFICATION_MESSAGES.POST.COMMENT.TITLE,
            postId
          });
          try {
            producer({
              token: userData.deviceToken,
    
              notification: {
                title: NOTIFICATION_MESSAGES.POST.COMMENT.TITLE,
                body: 
                userData.name + ' ' +
                NOTIFICATION_MESSAGES.POST.COMMENT.MESSAGE,
              },
              id: postId,             
            },QueueName.notification);
            consumer(QueueName.notification);
          } catch (err) {
            return err;
          }
        }
          return result;
        } catch (error) {
          console.error('Error in post create service', error);
          throw new ResponseError(422, error);
        }
      }
      /**
       * Updates a comment in the database.
       * @param req - The request object containing the comment ID in the `params` property and the updated comment data in the `body` property.
       * @returns The updated comment object.
       * @throws {ResponseError} If there is an error in the comment update service.
       */
      async commentUpdate(req: App.Request<IPost.Comment>){
        try {
          const comment = await CommentModel.findByIdAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new: true }
          )
          return comment;
        } catch (error) {
          console.error('Error in comment update service', error);
          return Promise.reject(new ResponseError(422, error));
        }
      }
  
      /**
       * Deletes a comment by updating the `is_deleted` field of the comment document to `true`.
       * @param req - The request object containing the comment ID in the `params` property.
       * @returns The deleted comment document.
       * @throws {ResponseError} If there is an error in the comment delete service.
       */
      async deleteComment(req: App.Request<IPost.Comment>) {
        try {
          const deletedComment = await CommentModel.findByIdAndUpdate(
            req.params._id,
            { is_deleted: true },
            { new: true }
          );

          return deletedComment;
        } catch (error) {
          console.error('Error in comment delete service', error);
          throw new ResponseError(422, error);
        }
      }
  
      /**
       * Retrieves a list of comments for a specific post.
       * Uses pagination to limit the number of comments returned per page and sorts them in descending order based on their creation date.
       * 
       * @param req - The request object containing the post ID and optional parent ID.
       * @returns A paginated list of comments for the specified post, sorted in descending order based on their creation date.
       * @throws {ResponseError} If there is an error in the service.
       */
      async commentList(req: App.Request<IPost.Comment>) {
        try {
          const { _id } = req.params;
          const parentId = req.query.parentId;
          const page = parseInt(req.query.page?.toString()) || 1;
          const limit = parseInt(req.query.limit?.toString()) || 10;
  
          const pipeline = [
            {
              $match: {
                postId: new ObjectId(_id),
                is_deleted: false,
                ...(parentId && { parentId: new ObjectId(parentId.toString()) }),
              },
            },
            { $sort: { createdAt: -1 } },
            {
              $lookup: {
                from: 'user',
                localField: 'userId', 
                foreignField: '_id',
                as: 'user_info', 
              },
            },
            {
              $project: {
                'user_info.name': 1,
                'user_info.profileImage': 1,
                'postId': 1,
                'createdAt': 1,
                'content': 1,
                'userId':1
              },
            },
          ];
  
          return await DAO.paginateWithNextHit(CommentModel, pipeline, limit, page);
        } catch (error) {
          console.error('Error in comment list service', error);
          throw new ResponseError(422, error);
        }
      }
      /**
       * Creates a new share record in the database.
       * 
       * @param req - The request object containing the userId and postId properties in the body.
       * @returns The newly created share record.
       */
      async sharePost(req: App.Request<IPost.Share>){
        try {
          const result = await ShareModel.create(req.body);
        return result;
        } catch (error) {
          console.error('Error in post share service', error);
          return Promise.reject(new ResponseError(422, error));
        }
      }
      async getUserWiseList(req: App.Request) {
        try{
        const { _id } = req.params
        const page = parseInt(req.query.page?.toString()) || 1;
        const limit = parseInt(req.query.limit?.toString()) || 10;
        
          const pipeline = [
            {
              $match: {
                userId: new ObjectId(_id),
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
            $lookup: {
              from: "user",
              localField: "userId",
              foreignField: "_id",
              as: "user_info",
            },
          },
          { $unwind: "$user_info" },
            {
              $project: {
                'user_info.name': 1,
                'user_info.profileImage': 1,
                userId: 1,
                title: 1,
                description: 1,
                image: 1,
                link: 1,
                gpt_summary: 1,
                totalComments: 1,
                pinComment: 1,
                discription: 1,
                readingTime: 1,
                is_deleted: 1,
                postPublished: 1,
                is_liked: 1,
                is_disliked: 1,
                createdAt:1
              },
            },
          ];
    
        return await DAO.paginateWithNextHit(this.Model, pipeline, limit, page);
        } 
          catch (error) {
            console.error('Error in post list service', error);
            return Promise.reject(new ResponseError(422, error));
          }
        }
  }

export const postService = new PostService();
