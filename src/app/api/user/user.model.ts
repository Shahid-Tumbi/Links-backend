import { UserStatus } from '@src/app/constants';
import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './user.constants';
import { IUser } from './user.interface';

const userSchema = new Schema(
	{
		userId: {type: Schema.Types.String},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},);
export const UserModel = model<IUser.Doc>(COLLECTION_NAME, userSchema);

const authSchema = new Schema({
	userName: { type: Schema.Types.String },
	name: { type: Schema.Types.String, required: true, index: true },
	email: { type: Schema.Types.String, required: true, index: true },
	password: { type: Schema.Types.String, required: true, index: true },
	countryCode: { type: Schema.Types.String, required: true },
	phoneNumber: { type: Schema.Types.String, required: true },
	otp: {
		otpCode: { type: Schema.Types.String },
		expireTime: { type: Schema.Types.Number }
	},
	isPhoneVerified: { type: Schema.Types.Boolean, default: false },
	isEmailVerified: { type: Schema.Types.Boolean, default: true },
	deviceToken: { type: Schema.Types.String, default: false },
	profileImage:{type:Schema.Types.String},
	status: {
		type: Schema.Types.String,
		enum: Object.values(UserStatus),
		default: UserStatus.Active,
	},
	latitude:{type: Schema.Types.Number},
	longitude:{type: Schema.Types.Number},
	pushNotification:{ type: Schema.Types.Boolean, default: false },
	emailNotification:{ type: Schema.Types.Boolean, default: false },
	address:{ type: Schema.Types.String },
	customerId:{type: Schema.Types.String},
	paymentMethod:{type: Schema.Types.String},
  },
  {
	  timestamps: true,
  });
  
  export const Auth = model<IUser.Auth>('Auth', authSchema);