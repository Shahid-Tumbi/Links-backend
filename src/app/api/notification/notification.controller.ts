import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationPost, ApiPath, SwaggerDefinitionConstant, ApiOperationDelete } from 'swagger-express-ts';
import { notificationService } from './notification.service';
import { INotification } from './notification.interface';
@ApiPath({
	path: '/notification',
	name: 'Notification Module',
})
/**
 * @description A controller to control user requests
 */
class NotificationController {
	@ApiOperationPost({
		description: 'Saved Notification',
		summary: 'Saved Notification',
		path: '/addNotification',
		parameters: {
			body: {
				description: 'Saved Notification',
				required: true,
				model: 'NotificationModel',
			},
		},
		security: {
			basicAuth: [],
		},
		responses: {
			200: {
				description: 'Success',
				type: 'String',
			},
		},
	})
	addNotification(req: App.Request<INotification.Doc>, res: App.Response, next: NextFunction) {
		notificationService
			.register(req.data, req.client)
			.then((result) => {
				res.success('Success', result);
			})
			.catch(next);
	}

	@ApiOperationPost({
		description: 'Notification Listing',
		summary: 'Notification Listing',
		path: '/notificationList',
		parameters: {
			body: {
				description: 'Notification Listing',
				required: true,
				model: 'NotificationModel',
			},
		},
		security: {
			basicAuth: [],
		},
		responses: {
			200: {
				description: 'Success',
				type: 'String',
			},
		},
	})
	notificationList(req: App.Request<INotification.INotificationFilter>, res: App.Response, next: NextFunction) {
		notificationService
			.notificationList(req.data, req.client)
			.then((result) => {
				res.success('Success', result);
			})
			.catch(next);
	}

	@ApiOperationDelete({
		description: 'Delete Notification',
		summary: 'Delete Notification',
		path: '/{_id}',
		parameters: {
			path: {
				_id: {
					required: true,
					type: SwaggerDefinitionConstant.STRING,
					description: 'mongoID',
				},
			},
		},
		security: {
			bearerAuth: [],
		},
		responses: {
			200: {
				description: 'Success',
				type: 'String',
			},
		},
	})
	deleteNotification(req: App.Request, res: App.Response, next: NextFunction) {
		notificationService
			.deleteNotification(req.data, req.client)
			.then((result) => {
				res.success('Success', result);
			})
			.catch(next);
	}
}

export const notificationController = new NotificationController();
