import { App } from '@src/app/app.interface';
import { Console, DbLogger, ResponseError } from '@src/utils';
import { INotification } from './notification.interface';
import { NotificationModel } from './notification.model';
import { DAO } from '@src/database';
import { ObjectId } from 'mongodb';
import { CronJob } from 'cron';
import { PostModel } from '../post/post.model';
import { consumer, producer } from '@src/rabbitmq';
import { QueueName } from '../user/user.constants';
import { NOTIFICATION_MESSAGES } from './notification.constants';
import { User } from '../user';

class NotificationService {
	readonly Model = NotificationModel;

	async register({ ...data }: INotification.Doc, client?: Partial<App.Client>) {
		try {
			Console.info(`partial ${JSON.stringify(client)}`);
			let result = await this.Model.create({
				...data,
			});
			return result;
		} catch (error) {
			Console.error('Error in regsiteration service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async notificationList(payload: INotification.INotificationFilter, client: Partial<App.Client>) {
		try {
			const pipeline:any = [
				{
					$match: {},
				},
				{
					$sort: {
						createdAt: -1,
					},
				},
			];

			if (payload.toUser) {
				let toUser = new ObjectId(payload.toUser);
				pipeline[0].$match['$and'] = pipeline[0].$match['$and'] ? pipeline[0].$match['$and'] : [];
				pipeline[0].$match['$and'] = [...pipeline[0].$match['$and'], ...[{ toUser: toUser }]];
			}
			// console.log("payload.userId",payload.userId)
			//   console.log("PAIPELINE",JSON.stringify(pipeline))
			return await DAO.paginateWithNextHit(NotificationModel, pipeline, payload.limit, payload.page);
		} catch (error) {
			Console.error('Error in admin login service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async deleteNotification(payload: INotification.Doc, client: Partial<App.Client>) {
		try {
			return await NotificationModel.remove({ _id: payload._id });
		} catch (error) {
			Console.error('Error in admin fetchPhotographerDetail service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
	async pushNotification() {
		try {
			DbLogger.info(`Notification Cron job called ${new Date()}`)
			const pipeline = [
				{
				  $match: {
					createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)},
				  },
				},
				 { $sort: { 'createdAt': -1 } },
				{
				  $lookup: {
					from: 'likes',
					localField: '_id',
					foreignField: 'postId',
					as: 'likes',
				  },
				},
				{
				  $project: {
					_id: 1,
					content: 1,
					createdAt: 1,
					userId:1,
					likeCount: { $size: '$likes' }, 
				  },
				},
			  ]
			  const postsWithLikes:any = await PostModel.aggregate(pipeline)
			for (const post of postsWithLikes) {
				if(post.likeCount > 1){
				const userId = post.userId;
				const user = await User.findOne({ _id:userId });
				if (user && user.deviceToken) {
				  try {
					NotificationModel.create({
						toUser: post.userId,
						notificationType: 0,
						content: post.likeCount + ' ' +
						NOTIFICATION_MESSAGES.POST.LIKED.TOTAL,
						title: NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
					  });
					producer({
					  token: user.deviceToken,
			
					  notification: {
						title: NOTIFICATION_MESSAGES.POST.LIKED.TITLE,
						body: 
						post.likeCount + ' ' +
						NOTIFICATION_MESSAGES.POST.LIKED.TOTAL,
					  },
					  id: postsWithLikes._id,             
					},QueueName.notification);
					consumer(QueueName.notification);
				  } catch (err) {
					return err;
				  }
				}
				}
			  }
			 
			

		} catch (error) {
			return Promise.reject(new ResponseError(422, error));
		}
	}

	job = new CronJob('0 0 * * *', () => {
		this.pushNotification();
	}).start();
}

export const notificationService = new NotificationService();
