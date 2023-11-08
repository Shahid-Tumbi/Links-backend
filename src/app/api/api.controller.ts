import { App } from '@app/app.interface';
import { NextFunction } from 'express';
import { ApiPath } from 'swagger-express-ts';
import { apiService } from './api.service';

@ApiPath({
	path: '',
	name: 'Global APIs',
})
class ApiController { 
	config(req: App.Request, res: App.Response, next: NextFunction) {
		apiService
		  .config(req, req.user)
		  .then((result) => {	
			res.success('Success', result);
		  })
		  .catch(next);
	  }
}

export const apiController = new ApiController();
