import { Router } from 'express';
import { apiV1Routes } from './api/api.routes';


// create Router
const router: Router = Router();

// router.get('/verify/:token', (req: ) => {})

// Use V1 Api Routes
router.use(apiV1Routes.path, apiV1Routes.router);


export default router;