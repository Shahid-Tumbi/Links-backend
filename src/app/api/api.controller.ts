// import { App } from '@app/app.interface';
// import { NextFunction } from 'express';
import { ApiPath } from 'swagger-express-ts';

@ApiPath({
	path: '',
	name: 'Global APIs',
})
class ApiController { }

export const apiController = new ApiController();
