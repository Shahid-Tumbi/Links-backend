import { UserType, LoginType, } from '@app/constants/user.constants';
import { Model, model, Schema } from 'mongoose';
import { SESSION_COLLECTION } from './session.constants';
import { IUserSession } from './session.interface';

const sessionSchema = new Schema<IUserSession, Model<IUserSession>>({
	deviceToken: {
		type: String,
		required: false,
	},
	deviceType: {
		type: String,
		required: false
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	userType: {
		type: String,
		enum: Object.values(UserType),
		default: UserType.User
	},
	deviceModel: {
		type: String,
		required: false
	},
	deviceId: {
		type: String,
		rqeuired: false
	},
	voipToken: {
		type: String,
		required: false
	},
	ipAddress: {
		type: String,
		required: false
	},
	status: {
		type: Boolean,
		defaultValue: true
	},
	signType: {
		type: String,
		enum: Object.values(LoginType),
		defaultValue: LoginType.Normal
	},
}, {
	timestamps: true,
	collection: SESSION_COLLECTION,
});

export const SessionModel = model<IUserSession>(SESSION_COLLECTION, sessionSchema);