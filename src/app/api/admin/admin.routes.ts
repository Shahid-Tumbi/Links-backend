import { Router } from 'express';
import { UserType } from '@app/constants';
import { adminController } from './admin.controller';
import { adminValidators } from './admin.validators';
import { adminSession } from '@src/app/middlewares';

// Create router
const router: Router = Router();

router.post(
  '/login',
  adminSession([UserType.Default]),
  adminValidators.login,
  adminController.login
);
router.post(
  '/logout',
  adminSession([UserType.Default]),
  adminValidators.logout,
  adminController.logout
);

//users listing
router.get(
  '/user',
  adminSession([UserType.Admin]),
  adminValidators.userListing,
  adminController.fetchUserListing
);

router.get(
  '/user/:_id',
  adminSession([UserType.Admin]),
  adminValidators.fetchUserDetail,
  adminController.fetchUserDetail
);

router.post(
  '/user',
  adminSession([UserType.Admin]),
  adminValidators.createUser,
  adminController.createUser
);

router.put(
  '/user/:_id',
  adminSession([UserType.Admin]),
  adminValidators.updateUser,
  adminValidators.updateUserParam,
  adminController.updateUser
);

router.delete(
  '/user/:_id',
  adminSession([UserType.Admin]),
  adminValidators.updateUserParam,
  adminController.deleteUser
);

router.get(
  '/file/:bucketPath?/:fileName',
  adminSession([UserType.Admin]),
  adminController.getImageFromS3
);

export const adminV1Routes = { path: '/admin', router };
