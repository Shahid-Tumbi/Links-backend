import { model, Schema } from 'mongoose';
import { COLLECTION_NAME } from './notification.constants';
import { INotification } from './notification.interface';

const notificationSchema = new Schema(
	{
		notificationType: { type: Schema.Types.Number, required: false, index: true },
		toUser: { type: Schema.Types.ObjectId, required: true, index: true },
		fromUser: { type: Schema.Types.ObjectId, required: false, index: true },
		content: { type: Schema.Types.String, required: true, index: true },
		createdAt: { type: Schema.Types.Date, required: false, index: true },
		title: { type: Schema.Types.String, required: true, index: true },
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	});
export const NotificationModel = model<INotification.Doc>(COLLECTION_NAME, notificationSchema);