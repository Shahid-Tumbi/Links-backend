import { UserStatus } from '@src/app/constants';
import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './admin.constants';
import { IAdmin } from './admin.interface';

const adminSchema = new Schema(
	{
		name: { type: Schema.Types.String, required: true, index: true },
		email: { type: Schema.Types.String, required: true, index: true },
		password: { type: Schema.Types.String, required: true, index: true },
		status: {
			type: Schema.Types.String,
			enum: Object.values(UserStatus),
			default: UserStatus.Active,
		}
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	});

export const AdminModel = model<IAdmin.Doc>(COLLECTION_NAME, adminSchema);