import { Router } from 'express';
import { UserType } from '@app/constants';
import { session } from '@app/middlewares';
import { notificationController } from './notification.controller';
import { notificationValidators } from './notification.validators';

// Create router
const router: Router = Router();

router.post('/addNotification', session([UserType.User]), notificationValidators.Notification, notificationController.addNotification);
router.post('/notificationList', session([UserType.User]), notificationValidators.listNotification, notificationController.notificationList);
router.delete('/:_id',session([UserType.User]),notificationValidators.updateReviewParam,notificationController.deleteNotification);

export const notificationRoutes = { path: '/notification', router };