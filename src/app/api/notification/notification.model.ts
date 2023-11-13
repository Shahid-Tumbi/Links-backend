import { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';
import { COLLECTION_NAME } from '../api.constants';

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
		collection: COLLECTION_NAME.notification,
	});
export const NotificationModel = model<INotification.Doc>(COLLECTION_NAME.notification, notificationSchema);