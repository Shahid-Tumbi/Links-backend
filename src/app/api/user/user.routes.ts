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
  session([UserType.User]),
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
    session([UserType.PhotoGrapher]),
  userController.getImageFromS3
);

router.get('/getConstant', userController.cosnstantApi);

// router.post(
//     '/reset-password',
//     session([UserType.Default]),
//     userValidators.resetPassword,
//     userController.resetPassword,
// );

// router.post(
//     '/forgot-password/resend',
//     session([UserType.Default]),
//     userValidators.resendPasswordOtp,
//     userController.resendPasswordOtp,
// );

// router.post(
//     '/forgot-password/verify',
//     session([UserType.Default]),
//     userValidators.forgotPasswordOtp,
//     userController.verifyForgetOtp,
// );

export const userV1Routes = { path: '/users', router };
