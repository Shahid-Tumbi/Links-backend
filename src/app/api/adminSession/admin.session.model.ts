import { LoginType,} from '@app/constants/user.constants';
import { model, Schema } from 'mongoose';
import { SESSION_COLLECTION } from './admin.session.constants';

const adminSessionSchema = new Schema({
	deviceToken: {
		type: String,
		required: false,
	},
	deviceType: {
		type: String,
		required: false
	},
	adminId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	deviceId: {
		type: String,
		rqeuired: false
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
	}
}, {
	timestamps: true,
	collection: SESSION_COLLECTION,
});

export const AdminSessionModel = model(SESSION_COLLECTION, adminSessionSchema);