import { Router } from 'express';
import { UserType } from '@app/constants';
import { session } from '@app/middlewares';
import { postController } from './post.controller';
import { postValidators } from './post.validators';

// Create router
const router: Router = Router();

router.post(
  '/create',
  session([UserType.User]),
  postValidators.create,
  postController.create,
);
router.get(
  '/:_id',
  session([UserType.User]),
  postValidators.idParamsSchema,
  postController.getPostDetail,
);
router.put(
    '/update/:_id',
    session([UserType.User]),
    postValidators.updatePost,
    postValidators.idParamsSchema,
    postController.update
  );
  router.delete(
    '/delete/:_id',
    session([UserType.User]),
    postValidators.idParamsSchema,
    postController.delete
  );
  router.get(
    '/',
    session([UserType.User]),
    postController.getList
  );

  router.post(
    '/like',
    session([UserType.User]),
    postValidators.likePost,
    postController.likePost
  );
  router.post(
    '/dislike',
    session([UserType.User]),
    postValidators.likePost,
    postController.dislikePost
  );
  
  router.post(
    '/comment',
    session([UserType.User]),
    postValidators.commentPost,
    postController.commentPost
  );
  router.put(
    '/comment/:_id',
    session([UserType.User]),
    postValidators.idParamsSchema,
    postValidators.commentUpdate,
    postController.commentUpdate,
  );
  router.delete(
    '/comment/:_id',
    session([UserType.User]),
    postValidators.idParamsSchema,
    postController.deleteComment
  );
  router.get(
    '/comment/:_id',
    session([UserType.User]),
    postController.getCommentList
  );
  router.post(
    '/share',
    session([UserType.User]),
    postValidators.sharePost,
    postController.sharePost
  );
  router.get(
    '/userWiseList/:_id',
    session([UserType.User]),
    postValidators.idParamsSchema,
    postController.getUserWiseList,
  );
  router.post(
    '/getVideoInfo/extraction',
    session([UserType.User]),
    postValidators.getVideoInfo,
    postController.getVideoInfo,
  );

export const postV1Routes = { path: '/posts', router };
