import { App } from '@src/app/app.interface';
import { LoginType, UserType } from '@src/app/constants';
import { DAO } from '@src/database';
import { Console, environment, passwordUtil, ResponseError } from '@src/utils';
import { adminSessionService } from '../adminSession';
import { UserModel, userService } from '../user';
import { IRegisterData } from '../user/user.interface';
import {
  ADMIN_MESSAGES,
  DB_PROJECTION,
} from './admin.constants';
import { IAdmin } from './admin.interface';
import { AdminModel } from './admin.model';
import fileUpload from '@src/utils/upload.util';
import getImageFromS3 from '@src/utils/getimage.util';
// import { ObjectId } from "mongodb";
class AdminService {
  readonly Model = AdminModel;

  async login(
    { deviceToken, ...data }: IAdmin.ILoginData,
    client: Partial<App.Client>
  ) {
    try {
      const where = {
        email: data.email,
      };
      const adminExist = await this.Model.findOne({ ...where });
      console.info('adminExist', adminExist);
      if (!adminExist) {
        return Promise.reject(
          new ResponseError(422, ADMIN_MESSAGES.LOGIN.INVALID.EN)
        );
      }
      // const isPasswordValid = await this.verifyPassword(adminExist, data.password);
      // if (!isPasswordValid) {
      // 	return Promise.reject(new ResponseError(422, ADMIN_MESSAGES.LOGIN.INVALID.EN));
      // }
      const token = await adminSessionService.create(
        adminExist.id,
        {
          ...client,
          deviceToken,
          signType: LoginType.Normal,
          userType: UserType.Admin,
        },
        {
          name: adminExist.name,
        }
      );
      return { profile: adminExist, token };
    } catch (error) {
      Console.error('Error in admin login service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async verifyPassword(user: any, password: string): Promise<boolean> {
    try {
      return await passwordUtil.verify.call(user, password);
    } catch (error) {
      return Promise.reject(
        new ResponseError(401, ADMIN_MESSAGES.LOGIN.INVALID)
      );
    }
  }

  async logout(
    { deviceToken, ...data }: IAdmin.ILogoutData,
    client: Partial<App.Client>
  ) {
    try {
      adminSessionService.logout(data.adminId);
      return {};
    } catch (error) {
      Console.error('Error in admin login service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async fetchUsers(payload: IAdmin.IUsers, client: Partial<App.Client>) {
    try {
      const pipeline = [
        { $match: {} },
        { $sort: { createdAt: -1 } },
        {
          $project: DB_PROJECTION.USER_PROJECTION,
        },
      ];
      if (payload.search) {
        pipeline[0].$match = {
          $or: [
            { name: { $regex: payload.search } },
            { phoneNumber: { $regex: payload.search } },
            { email: { $regex: payload.search } },
          ],
        };
      }
      return await DAO.paginateWithNextHit(
        UserModel,
        pipeline,
        payload.limit,
        payload.page
      );
    } catch (error) {
      Console.error('Error in admin login service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async createUser(payload: IRegisterData, client: Partial<App.Client>) {
    try {
      //@TODO add deviceToken
      payload['deviceToken'] = 'a190231mmm';
      payload['password'] = environment?.user?.password
        ? environment?.user?.password
        : 'User@@321';
      return await userService.register(payload);
    } catch (error) {
      Console.error('Error in admin login service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async fetchUserDetail(payload: IAdmin.IUsers, client: Partial<App.Client>) {
    try {
      return await DAO.findOne(UserModel, { _id: payload._id });
    } catch (error) {
      Console.error('Error in admin fetchUserDetail service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async updateUserDetail(payload: IAdmin.IUsers, client: Partial<App.Client>) {
    try {
      return await UserModel.findOneAndUpdate({ _id: payload._id }, payload, {
        new: true,
      });
    } catch (error) {
      Console.error('Error in admin fetchUserDetail service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }

  async deleteUserDetail(payload: IAdmin.IUsers, client: Partial<App.Client>) {
    try {
      return await UserModel.remove({ _id: payload._id });
    } catch (error) {
      Console.error('Error in admin fetchUserDetail service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }
  async upload(req: any, res: any) {
    try {
      console.log('req.query.user', req.query.user);
      let userUpload = req.query.user;
      return fileUpload(req, userUpload);
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async getImageFromS3(req: any, res: any) {
    try {
      return getImageFromS3(req, res);
    } catch (error) {
      Console.error('Error in  service', error);
      return Promise.reject(new ResponseError(422, error));
    }
  }
}

export const adminService = new AdminService();
