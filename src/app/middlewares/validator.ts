import * as Joi from 'joi';
import { NextFunction } from 'express';
import { ResponseError } from '@src/utils';
import { App } from '@app/app.interface';

type DataResolver = 'body' | 'params' | 'query' | ((req: App.Request) => any);

export function validateSchema(schema: Joi.ObjectSchema, dataResolver: DataResolver) {
	return (req: App.Request, res: App.Response, next: NextFunction) => {
		// console.log('Validating Schema');
		const data = typeof dataResolver === 'function' ? dataResolver(req) : req[dataResolver];
		try {
			const result = Joi.attempt(data, schema);
			req.data = {
				...(req.data || {}),
				...result,
			};
			next();
		} catch (error) {
			const message: string = error.details[0].message.split('\'').join('');
			res.error(new ResponseError(400, message.replace(new RegExp('\"', 'gi'), '')));
		}
	};
}
