import { App } from '@src/app/app.interface';
import { NextFunction } from 'express';
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { IDevice } from './faq.interface';
import { deviceFAQService } from './faq.service';

@ApiPath({
	path: '/device',
	name: 'Device FAQ Module',
})

/**
 * @description A controller to control Device faq requests
 */
class DeviceFAQController {


	@ApiOperationPost({
		description: 'Create FAQ',
		summary: 'Create device FAQ',
		path: '/faq',
		parameters: {
			body: {
				description: 'create faq',
				required: true,
				model: 'DeviceCreateFAQ',
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
	createFAQ(req: App.Request<IDevice.IFAQ>, res: App.Response, next: NextFunction) {
		deviceFAQService.createFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationGet({
		description: "Device FAQ Listing",
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
	fetchFAQ(req: App.Request<IDevice.IFAQ>, res: App.Response, next: NextFunction) {
		deviceFAQService.fetchFAQs(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationGet({
		description: "Device FAQ Listing",
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
	fetchFAQDetail(req: App.Request<IDevice.IFAQ>, res: App.Response, next: NextFunction) {
		deviceFAQService.fetchFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationDelete({
		description: "Device FAQ Delete",
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
	removeFAQ(req: App.Request<IDevice.IFAQ>, res: App.Response, next: NextFunction) {
		deviceFAQService.removeFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

	@ApiOperationPut({
		description: "Device FAQ Listing",
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
				model: 'DeviceUpdateFAQ',
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
	updateFAQ(req: App.Request<IDevice.IFAQ>, res: App.Response, next: NextFunction) {
		deviceFAQService.updateFAQ(req.data, req.client).then((result) => {
			res.success('Success', result);
		}).catch(next);
	}

}

export const deviceFAQController = new DeviceFAQController();