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
    parameters:{
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
        model: 'UpdatePost',
      },
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
    parameters: {
      query: {
        page: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
          description: 'Page No',
          default: 1,
        },
        limit: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
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
  })
  getList(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .postList(req, req.user)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
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
  })
  likePost(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .likePost(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
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
  })
  dislikePost(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .dislikePost(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
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
  })
  commentPost(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .commentPost(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPut({
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
  commentUpdate(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {       
     
    postService
      .commentUpdate(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationDelete({
    description: 'Comment Delete',
    summary: 'Comment Delete',
    path: '/comment/{_id}',
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
  deleteComment(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ){        
    postService
      .deleteComment(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationGet({
    description: 'Comment List',
    summary: 'Comment List',
    path: '/comment/{_id}',
    parameters: {
      path: {
        _id: {
          required: true,
          type: SwaggerDefinitionConstant.STRING,
          description: 'postId',
        },
      },
      query: {
        page: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
          description: 'Page No',
          default: 1,
        },
        limit: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
          description: 'Limit',
          default: 5,
        },
        parentId: {
          required: false,
          description: 'Parent comment Id (if it is replied comment)',
          type: SwaggerDefinitionConstant.STRING,
          default: '5erre5-refd45yuyu-dsdsfd-43fdd' as any, 
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
  getCommentList(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .commentList(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
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
  })
  sharePost(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .sharePost(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Get Users wise Post List',
    summary: 'Get Users wise Post List',
    path: '/userWiseList/{_id}',
    parameters: {
      path: {
        _id: {
          required: true,
          type: SwaggerDefinitionConstant.STRING,
          description: 'mongoID',
        },
      },
      query: {
        page: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
          description: 'Page No',
          default: 1,
        },
        limit: {
          required: false,
          type: SwaggerDefinitionConstant.NUMBER,
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
  })
  getUserWiseList(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .getUserWiseList(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  getVideoInfo(
    req: App.Request,
    res: App.Response,
    next: NextFunction
  ) {        
    postService
      .getVideoInfo(req)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
}

export const postController = new PostController();
