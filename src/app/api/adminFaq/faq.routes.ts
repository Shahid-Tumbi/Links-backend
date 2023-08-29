import { Router } from 'express';
import { UserType } from '@app/constants';
import { adminFAQController } from './faq.controller';
import { adminValidators } from './faq.validators';
import { adminSession } from '@src/app/middlewares';

// Create router
const router: Router = Router();

router.post('/faq', adminSession([UserType.Admin]), adminValidators.createFAQ, adminFAQController.createFAQ);
router.get('/faq', adminSession([UserType.Admin]), adminValidators.fetchFAQ, adminFAQController.fetchFAQ);
router.get('/faq/:_id', adminSession([UserType.Admin]), adminValidators.fetachFAQDetail, adminFAQController.fetchFAQDetail);
router.delete('/faq/:_id', adminSession([UserType.Admin]), adminValidators.fetachFAQDetail, adminFAQController.removeFAQ);
router.put('/faq/:_id', adminSession([UserType.Admin]), adminValidators.updateFAQ, adminValidators.updateFAQParams, adminFAQController.updateFAQ);

export const adminFAQV1Routes = { path: '/admin', router };