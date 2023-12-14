import { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';
import { COLLECTION_NAME } from '../api.constants';
import { NotificationType } from '@src/app/constants';

const notificationSchema = new Schema(
	{
		notificationType: { 
			type: Schema.Types.String, 
			enum: Object.values(NotificationType),
			default: NotificationType.Default },
		toUser: { type: Schema.Types.ObjectId, required: true, index: true },
		fromUser: { type: Schema.Types.ObjectId, required: false, index: true },
		content: { type: Schema.Types.String, required: true },
		createdAt: { type: Schema.Types.Date, required: false },
		title: { type: Schema.Types.String, required: true },
		postId: { type: Schema.Types.ObjectId, required: false }
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME.notification,
	});
export const NotificationModel = model<INotification.Doc>(COLLECTION_NAME.notification, notificationSchema);