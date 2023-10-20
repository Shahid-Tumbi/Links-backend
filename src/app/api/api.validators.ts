import { validateSchema } from '../middlewares';
import * as Joi from 'joi';
import { CONSTANT } from './api.constants';
import { JString, JList, JUUID1 } from '@validators/index';
import { GlobalSearchType } from '../constants';

export const apiValidators = {
	entity: validateSchema(Joi.object({
		id: JString.length(24).required(),
	}), 'params'),
	syncData: validateSchema(Joi.object(Object.values(CONSTANT.DATABASE.ENTITY).reduce((schema:any, entity:any) => {
		schema[entity] = Joi.boolean().default(true);
		return schema;
	}, {})), 'query'),
	home: validateSchema(JList.keys({
		address: JString.allow(null, ''),
		hashtag_id: JUUID1,
		is_klip: Joi.boolean(),
	}), 'query'),
	globalSearch: validateSchema(JList.keys({
		type: JString
			.valid(...Object.values(GlobalSearchType))
			.default(GlobalSearchType.Top),
	}), 'query'),
	socialMix: validateSchema(JList, 'query')
};
