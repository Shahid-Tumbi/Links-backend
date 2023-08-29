import { Router } from 'express';
import { UserType } from '@app/constants';
import { deviceFAQController } from './faq.controller';
import { deviceValidators } from './faq.validators';
import { session } from '@src/app/middlewares';

// Create router
const router: Router = Router();

router.post('/faq', session([UserType.User]), deviceValidators.createFAQ,deviceFAQController.createFAQ);
router.get('/faq', session([UserType.User]), deviceValidators.fetchFAQ, deviceFAQController.fetchFAQ);
router.get('/faq/:_id', session([UserType.User]), deviceValidators.fetachFAQDetail, deviceFAQController.fetchFAQDetail);
router.delete('/faq/:_id', session([UserType.User]), deviceValidators.fetachFAQDetail, deviceFAQController.removeFAQ);
router.put('/faq/:_id', session([UserType.User]), deviceValidators.updateFAQ, deviceValidators.updateFAQParams, deviceFAQController.updateFAQ);

export const deviceFAQV1Routes = { path: '/device', router };