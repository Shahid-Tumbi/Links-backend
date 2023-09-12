import { App } from '@src/app/app.interface';
import {
	ResponseError,
} from '@src/utils';
import { PostModel } from './post.model';
import { ICreatePostData, IDeletePostData,  IUpdatePostData } from './post.interface';
import { POST_MESSAGES } from './post.constants';
import { DAO } from '@src/database';
import { User } from '../user';
import { USER_MESSAGES } from '../user/user.constants';

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
        if(!user){
          return Promise.reject(
            new ResponseError(422,USER_MESSAGES.USER_NOT_FOUND)
        )
        }
        console.log('USER==',user);
        
        const result = await this.Model.create(data);
        return result;
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
    async postDetail(req:App.Request, client: Partial<App.Client>){
      try {
        const post = await this.Model.findById({_id:req.params._id})        
        if(!post){
            return Promise.reject(
                new ResponseError(422,POST_MESSAGES.DATA_NOT_FOUND)
            );
        }
        return post 
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
          { new: true }
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
    async postList(req: App.Request) {
      try{
      const page = parseInt(req.query.page?.toString()) || 1;
      const limit = parseInt(req.query.limit?.toString()) || 10;
  
      const pipeline = [
        { $match: { is_deleted: false } },
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
