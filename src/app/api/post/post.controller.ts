import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import {
    ICreatePostData, IUpdatePostData,
} from './post.interface';
import { postService } from './post.service';

@ApiPath({
  path: '/posts',
  name: 'Post Module',
})
/**
 * @description A controller to control user requests
 */
class PostController {
  
    @ApiOperationPost({
        description: 'Create Post',
        summary: 'Create Post',
        path: '/create',
        parameters: {
          body: {
            description: 'Create',
            required: true,
            model: 'PostCreate',
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
      })
  create(
    req: App.Request<ICreatePostData>,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .createPost(req.body)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  
  @ApiOperationGet({
    description: 'Post Detail',
    summary: 'Post Detail',
    path: '/{_id}',
    security: {
        bearerAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  getPostDetail(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {    
    postService
      .postDetail(req, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPut({
    description: 'Update Post',
    summary: 'Update Post',
    path: '/update/{_id}',
    parameters: {
      body: {
        description: 'Update',
        required: true,
        model: 'PostUpdate',
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
  })
  update( 
    req: App.Request<IUpdatePostData>,
    res: App.Response,
    next: NextFunction){
        postService
        .updatePost(req.data, req.client)
          .then((result) => {
            res.success('Success', result);
          })
          .catch(next);

  }
  @ApiOperationDelete({
    description: 'Delete Post',
    summary: 'Delete Post',
    path: '/delete/{_id}',
    parameters: {
      path: {
        _id: {
          required: true,
          type: SwaggerDefinitionConstant.STRING,
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
  })
  delete(req: App.Request, res: App.Response, next: NextFunction) {
    postService
      .deletePost(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationGet({
    description: 'Post List',
    summary: 'Post List',
    path: '/',
    security: {
        bearerAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  getList(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .postList(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
}

export const postController = new PostController();
