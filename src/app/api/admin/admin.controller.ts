import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { IAdmin } from './admin.interface';
import { adminService } from './admin.service';

@ApiPath({
  path: '/admin',
  name: 'Admin Module',
})

/**
 * @description A controller to control user requests
 */
class AdminController {
  @ApiOperationPost({
    description: 'Login Admin',
    summary: 'Login Admin',
    path: '/login',
    parameters: {
      body: {
        description: 'Login',
        required: true,
        model: 'AdminLoginData',
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
  login(
    req: App.Request<IAdmin.ILoginData>,
    res: App.Response,
    next: NextFunction
  ) {
    adminService
      .login(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Logout Admin',
    summary: 'Logout Admin',
    path: '/logout',
    parameters: {
      body: {
        description: 'Logout',
        required: true,
        model: 'AdminLogoutData',
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
  logout(
    req: App.Request<IAdmin.ILogoutData>,
    res: App.Response,
    next: NextFunction
  ) {
    adminService
      .logout(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationGet({
    description: 'List of Users',
    summary: 'Dashboard Users',
    path: '/user',
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
  fetchUserListing(
    req: App.Request<IAdmin.IUsers>,
    res: App.Response,
    next: NextFunction
  ) {
    adminService
      .fetchUsers(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPost({
    description: 'Admin Create User',
    summary: 'Admin Create User',
    path: '/user',
    parameters: {
      body: {
        description: 'Admin Create User',
        required: true,
        model: 'AddUserAdmin',
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
  createUser(req: App.Request, res: App.Response, next: NextFunction) {
    adminService
      .createUser(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationGet({
    description: 'Admin User Detail',
    path: '/user/{_id}',
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
  fetchUserDetail(
    req: App.Request<IAdmin.IUsers>,
    res: App.Response,
    next: NextFunction
  ) {
    adminService
      .fetchUserDetail(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationPut({
    description: 'Admin Update User',
    summary: 'Admin Update User',
    path: '/user/{_id}',
    parameters: {
      body: {
        description: 'Admin Update User',
        required: true,
        model: 'UpdateUserAdmin',
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
  updateUser(req: App.Request, res: App.Response, next: NextFunction) {
    adminService
      .updateUserDetail(req.data, req.client)
      .then((result) => {
        res.success('Success', result);
      })
      .catch(next);
  }

  @ApiOperationDelete({
    description: 'Admin Delete User',
    summary: 'Admin Delete User',
    path: '/user/{_id}',
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
  deleteUser(req: App.Request, res: App.Response, next: NextFunction) {
    adminService
      .deleteUserDetail(req.data, req.client)
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
    adminService
      .upload(req, req.client)
      .then((result) => {
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
    adminService
      .getImageFromS3(req, res)
      .then((result) => {
        return result;
      })
      .catch(next);
  }
}

export const adminController = new AdminController();
