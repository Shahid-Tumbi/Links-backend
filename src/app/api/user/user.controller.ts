import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { USER_MESSAGES } from './user.constants';
import {
  IRegisterData,
  ILogoutData,
  IChangePassword,
  FollowData,
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
      .register(req)
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
  login(req: App.Request, res: App.Response, next: NextFunction) {
    console.info(req.data, req.client);
    userService
      .login(req)
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
        description: 'Forgot Password',
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
    description: 'reset password',
    summary: 'reset password',
    path: '/reset-password',
    parameters: {
      body: {
        description: 'reset password',
        required: true,
        model: 'resetPassword',
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
  resetPassword(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .resetPassword(req)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Change Password',
    summary: 'Change Password',
    path: '/change-password',
    parameters: {
      body: {
        description: 'Change Password',
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
    userService
      .changePassword(req.data)
      .then((result) => {
        res.success(USER_MESSAGES.FORGET_PASSWORD.SUCCESS, result);
      })
      .catch(next);
  }
  @ApiOperationPut({
    description: 'Update User Data',
    summary: 'Update User Data',
    path: '/updateUserData',
    parameters: {
      body: {
        description: 'Update User Data',
        required: true,
        model: 'UpdateUserData',
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
  updateUserData(req: App.Request, res: App.Response, next: NextFunction) {
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
      .logout(req.data, req)
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
  @ApiOperationPost({
    description: 'Follow User',
    summary: 'Follow User',
    path: '/follow',
    parameters: {
      body: {
        description: 'Follow User',
        required: true,
        model: 'FollowUser',
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
  follow(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .follow(req, req.user)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationGet({
    description: 'Follower List',
    summary: 'Follower List',
    path: '/followers/{_id}',
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
  followerList(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .getUserFollowList(req)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationGet({
    description: 'Following List',
    summary: 'Following List',
    path: '/following/{_id}',
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
  followingList(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .getUserFollowList(req)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationPost({
    description: 'Unfollow User',
    summary: 'Unfollow User',
    path: '/unfollow',
    parameters: {
      body: {
        description: 'Unfollow User',
        required: true,
        model: 'FollowUser',
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
  unfollow(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .unfollow(req, req.user)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationGet({
    description: 'Get Curator  List',
    summary: 'Get Curator  List',
    path: '/curatorList',
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
  getCuratorList(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .getCuratorList(req)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
  @ApiOperationGet({
    description: 'Get User Details',
    summary: 'Get User Details',
    path: '/userDetail/{_id}',
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
  getUserDetail(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .getUserDetail(req)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
  searchCuratorList(req: App.Request<FollowData>, res: App.Response, next: NextFunction) {
    // console.info("req",req)
    userService
      .searchCuratorList(req,req.user)
      .then((result) => {
        // console.info("res",res)

        res.success('Success', result);
      })
      .catch(next);
  }
}

export const userController = new UserController();
