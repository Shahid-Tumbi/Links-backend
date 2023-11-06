import { RequestStatus, UserStatus } from '@src/app/constants';
import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './user.constants';
import { IUser } from './user.interface';

const userSchema = new Schema({
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
	bio:{ type: Schema.Types.String },
	isPrivate: { type: Schema.Types.Boolean, default: false },
  },
  {
	  timestamps: true,
	  collection: COLLECTION_NAME.user,
  });
  
  export const User = model<IUser.User>(COLLECTION_NAME.user, userSchema);

  const userDetailSchema = new Schema(
	{
		userId: {type: Schema.Types.String, index: true},
		totalFollowers :  { type: Schema.Types.Number , default: 0},
		totalFollowings :  { type: Schema.Types.Number , default: 0},
		referralCode: {type: Schema.Types.String},
		referrer: {type: Schema.Types.String}
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME.userDetail,
	},);
export const UserDetailModel = model<IUser.Doc>(COLLECTION_NAME.userDetail, userDetailSchema);

const followSchema = new Schema(
	{
		followerId: {type: Schema.Types.ObjectId, index: true},		//User that want follow someone
		followingId: {type: Schema.Types.ObjectId, index: true},	//User that follow by someone
		followRequestDate: {type: Schema.Types.Date},
		is_deleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME.follow,
	},);
export const FollowModel = model<IUser.Doc>(COLLECTION_NAME.follow, followSchema);

const followRequestSchema = new Schema(
	{
		followerId: {type: Schema.Types.ObjectId, index: true},		//User that want follow someone
		followingId: {type: Schema.Types.ObjectId, index: true},	//User that follow by someone
		status: {
			type: Schema.Types.String,
			enum: Object.values(RequestStatus),
			default: RequestStatus.Pending,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME.followRequest,
	},);
export const FollowRequestModel = model<IUser.Doc>(COLLECTION_NAME.followRequest, followRequestSchema);