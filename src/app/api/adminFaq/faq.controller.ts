import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { IAdmin } from './faq.interface';
import { adminFAQService } from './faq.service';

@ApiPath({
	path: '/admin',
	name: 'Admin FAQ Module',
})

/**
 * @description A controller to control admin faq requests
 */
class AdminFAQController {


	@ApiOperationPost({
		description: 'Create FAQ',
		summary: 'Create admin FAQ',
		path: '/faq',
		parameters: {
			body: {
				description: 'create faq',
				required: true,
				model: 'AdminCreateFAQ',
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
		}
	})
	createFAQ(req: App.Request<IAdmin.IFAQ>, res: App.Response, next: NextFunction) {
		adminFAQService.createFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationGet({
		description: "Admin FAQ Listing",
		path: '/faq',
		parameters: {
			query: {
				page: {
					required: true,
					type: SwaggerDefinitionConstant.NUMBER,
					description: 'Page No',
					default: 1,
				},
				limit: {
					required: true,
					type: SwaggerDefinitionConstant.NUMBER,
					description: 'Limit',
					default: 5,
				},
				lang: {
					required: false,
					type: SwaggerDefinitionConstant.STRING,
					description: 'lang'
				},
				sortOrder: {
					required: false,
					type: SwaggerDefinitionConstant.NUMBER,
					description: 'sort order',
					default: 1,
				},
				userType: {
					required: false,
					type: SwaggerDefinitionConstant.STRING,
					description: 'user type',
					default: 2,
				}
			}
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
	fetchFAQ(req: App.Request<IAdmin.IFAQ>, res: App.Response, next: NextFunction) {
		adminFAQService.fetchFAQs(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationGet({
		description: "Admin FAQ Listing",
		path: '/faq/{_id}',
		parameters: {
			path: {
				_id: {
					required: true,
					type: SwaggerDefinitionConstant.STRING,
					description: 'mongoID'
				}
			}
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
	fetchFAQDetail(req: App.Request<IAdmin.IFAQ>, res: App.Response, next: NextFunction) {
		adminFAQService.fetchFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationDelete({
		description: "Admin FAQ Delete",
		path: '/faq/{_id}',
		parameters: {
			path: {
				_id: {
					required: true,
					type: SwaggerDefinitionConstant.STRING,
					description: 'mongoID'
				}
			}
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
	removeFAQ(req: App.Request<IAdmin.IFAQ>, res: App.Response, next: NextFunction) {
		adminFAQService.removeFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationPut({
		description: "Admin FAQ Listing",
		path: '/faq/{_id}',
		parameters: {
			path: {
				_id: {
					required: true,
					type: SwaggerDefinitionConstant.STRING,
					description: 'mongoID'
				}
			},
			body: {
				description: 'update faq',
				required: true,
				model: 'AdminUpdateFAQ',
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
	updateFAQ(req: App.Request<IAdmin.IFAQ>, res: App.Response, next: NextFunction) {
		adminFAQService.updateFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

}

export const adminFAQController = new AdminFAQController();