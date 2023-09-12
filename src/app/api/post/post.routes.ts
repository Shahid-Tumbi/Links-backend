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
export const postV1Routes = { path: '/posts', router };
