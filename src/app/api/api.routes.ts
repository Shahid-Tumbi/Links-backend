import { Router, NextFunction } from 'express';
import { apiMiddleware } from '@middlewares/api';
import { ResponseError } from '@src/utils/error.util';
import { App } from '../app.interface';
import { userV1Routes } from './user/user.routes';
import { apiDebugger } from '@utils/debug.util';
import { adminV1Routes } from './admin/admin.routes';
import { adminFAQV1Routes } from './adminFaq/faq.routes';
import { deviceFAQV1Routes } from './deviceFaq/faq.routes';
import { notificationRoutes } from './notification/notification.routes'

// create Router
const router: Router = Router();

router.use(apiMiddleware);

router.get('/timeout', (req, res, next) => {
	// res.setTimeout(1000);
});


router.get('/privacy-policy', (req: App.Request, res: App.Response) => {
	res.render('TermsofService.html');
});

router.use(userV1Routes.path, userV1Routes.router);
router.use(adminV1Routes.path, adminV1Routes.router);
router.use(adminFAQV1Routes.path,adminFAQV1Routes.router);
router.use(deviceFAQV1Routes.path,deviceFAQV1Routes.router);
router.use(notificationRoutes.path,notificationRoutes.router);

router.use((req: App.Request, res: App.Response, next: NextFunction) => {
	next(new ResponseError(404, 'Not Found'));
});

router.use((err: ResponseError, req: App.Request, res: App.Response, next: NextFunction) => {
	apiDebugger.log(req, err);
	res.error(err);
});

export const apiV1Routes = { path: '/v1', router };