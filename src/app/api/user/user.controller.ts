import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import { USER_MESSAGES } from './user.constants';
import {
  ILoginData,
  IRegisterData,
  ILogoutData,
  IChangePassword,
} from './user.interface';
import { userService } from './user.service';
import { VerifyOtpData } from './user.swagger';

@ApiPath({
  path: '/users',
  name: 'User Module',
})
/**
 * @description A controller to control user requests
 */
class UserController {
  @ApiOperationPost({
    description: 'Register User',
    summary: 'Register User',
    path: '/register',
    parameters: {
      body: {
        description: 'Register',
        required: true,
        model: 'UserRegister',
      },
    },
    security: {
      basicAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  register(
    req: App.Request<IRegisterData>,
    res: App.Response,
    next: NextFunction
  ) {    
    userService
      .register(req.data, req.client,req.ip)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Verify your OTP sent to provided phone nunber',
    summary: 'Verify Phone Number with OTP',
    path: '/verify-otp',
    parameters: {
      body: {
        description: 'Verify OTP Code',
        required: true,
        model: 'VerifyOtpData',
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
  verifyOtp(
    req: App.Request<VerifyOtpData>,
    res: App.Response,
    next: NextFunction
  ) {
    userService
      .verifyOtp(req.data, req.user)
      .then((message) => {
        res.success(message || USER_MESSAGES.VERIFY_OTP.SUCCESS);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Resend OTP code to provided email/phone nunber',
    path: '/resend-otp',
    summary: 'Resend OTP Code',
    parameters: {
      body: {
        description: 'Resend Otp Code',
        required: false,
        model: 'ResendOtpData',
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
  resendOtp(req: App.Request<any>, res: App.Response, next: NextFunction) {
    userService
      .resendOtp(req.data, req.user)
      .then(() => {
        res.success(USER_MESSAGES.RESEND_OTP.SUCCESS);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'User Login',
    summary: 'Login Users',
    path: '/login',
    parameters: {
      body: {
        description: 'Login',
        required: true,
        model: 'UserLogin',
      },
    },
    security: {
      basicAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  login(req: App.Request<ILoginData>, res: App.Response, next: NextFunction) {
    console.info(req.data, req.client);
    userService
      .login(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Forgot Password',
    summary: 'Forgot Password',
    path: '/forgot-password',
    parameters: {
      body: {
        description: 'User Data',
        required: true,
        model: 'ForgotPasswordData',
      },
    },
    security: {
      basicAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  forgotPassword(req: App.Request<any>, res: App.Response, next: NextFunction) {
    userService
      .forgotPassword(req.data)
      .then((result) => {
        console.log('----result----', result);
        res.success(USER_MESSAGES.FORGET_PASSWORD.SEND, result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Change Password',
    summary: 'Change Password',
    path: '/change-password',
    parameters: {
      body: {
        description: 'User Data',
        required: true,
        model: 'ChangePasswordData',
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
  changePassword(
    req: App.Request<IChangePassword>,
    res: App.Response,
    next: NextFunction
  ) {
    console.info(req.data);
    userService
      .changePassword(req.data)
      .then((result) => {
        res.success(USER_MESSAGES.FORGET_PASSWORD.SUCCESS, result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Update User Data',
    summary: 'Update User Data',
    path: '/updateUserData',
    parameters: {
      body: {
        description: 'Update User Data',
        required: true,
        model: 'updateUserData',
      },
    },
    security: {
      basicAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  updateUserData(req: App.Request, res: App.Response, next: NextFunction) {
    console.log('updateUserData', req.data);
    userService
      .updateUserData(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Logout User',
    summary: 'Logout User',
    path: '/logout',
    parameters: {
      body: {
        description: 'Logout',
        required: true,
        model: 'LogoutData',
      },
    },
    security: {
      basicAuth: [],
    },
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  logout(req: App.Request<ILogoutData>, res: App.Response, next: NextFunction) {
    console.info('req', req.data);
    userService
      .logout(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Upload File ',
    summary: 'Upload File',
    path: '/upload',
    parameters: {
      body: {
        description: 'Upload File',
        required: true,
        model: 'UploadData',
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
  upload(req: App.Request<any>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .upload(req, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Get User Constants ',
    summary: 'Get User Constants',
    path: '/getConstant',
    parameters: {},
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  cosnstantApi(req: App.Request, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .constantData(req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Send Notification ',
    summary: 'Send Notification',
    path: '/notification',
    parameters: {},
    responses: {
      200: {
        description: 'Success',
        type: 'String',
      },
    },
  })
  notification(req: App.Request, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .notification(req, res)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationGet({
    description: 'Get User Profile Image ',
    summary: 'Get User Image',
    path: '/file/:bucketPath?/:fileName',
    parameters: {},
    responses: {
      200: {
        description: 'Success',
        type: 'Image',
      },
    },
  })
  getImageFromS3(req: App.Request, res: App.Response, next: NextFunction) {
    userService
      .getImageFromS3(req, res)
      .then((result) => {
        return result;
      })
      .catch(next);
  }
}

export const userController = new UserController();
