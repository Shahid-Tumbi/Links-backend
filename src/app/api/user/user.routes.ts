import { Router } from 'express';
import { UserType } from '@app/constants';
import { adminSession, session } from '@app/middlewares';
import { userController } from './user.controller';
import { userValidators } from './user.validators';

// Create router
const router: Router = Router();

router.post(
  '/register',
  session([UserType.Default]),
  userValidators.register,
  userController.register
);

router.post(
  '/verify-otp',
  session([UserType.User]),
  userValidators.verifyOtp,
  userController.verifyOtp
);

router.post('/resend-otp', session([UserType.User]), userController.resendOtp);

router.post(
  '/login',
  session([UserType.Default]),
  userValidators.login,
  userController.login
);

router.put(
  '/updateUserData/:_id',
  session([UserType.User]),
  userValidators.updateUserData,
  userValidators.updateUserDataSchemas,
  userController.updateUserData
);

router.post(
  '/forgot-password',
  session([UserType.Default]),
  userValidators.forgotPassword,
  userController.forgotPassword
);
router.post(
  '/change-password',
  session([UserType.User]),
  userValidators.changePassword,
  userController.changePassword
);

router.post(
  '/logout',
  session([UserType.Default]),
  userValidators.logout,
  userController.logout
);

router.post('/upload', session([UserType.User]), userController.upload);

router.post(
  '/notification',
  session([UserType.User]),
  userController.notification
);

router.get(
  '/file/:bucketPath?/:fileName',
  session([UserType.User]) ||
    adminSession([UserType.Admin]) ||
    session([UserType.Default]),
  userController.getImageFromS3
);

//Followers management Module 
router.post('/follow',
 session([UserType.User]),
 userValidators.follow,
 userController.follow
 );
router.get('/followers/:_id',
 session([UserType.User]),
 userController.followerList
 );
router.get('/following/:_id',
 session([UserType.User]),
 userController.followingList
 );
router.post('/unfollow',
 session([UserType.User]),
 userValidators.follow,
 userController.unfollow
 );
router.post('/reset-password',
 session([UserType.Default]),
 userValidators.resetPassword,
 userController.resetPassword
 );
 router.get('/curatorList',
 session([UserType.User]),
 userController.getCuratorList
 );
 router.get('/userDetail/:id',
 session([UserType.User]),
 userController.getUserDetail
 );
 router.get('/searchCuratorList',
 session([UserType.User]),
 userValidators.searchCuratorList,
 userController.searchCuratorList
 );
export const userV1Routes = { path: '/users', router };
