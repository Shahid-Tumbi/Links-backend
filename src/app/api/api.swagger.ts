import { SwaggerDefinitionConstant } from 'swagger-express-ts';
export * from './user/user.swagger';
export * from './admin/admin.swagger';
export * from './adminFaq/faq.swagger';

export const SListOptions = {
	page: {
		type: SwaggerDefinitionConstant.NUMBER,
		required: false,
		description: 'Page Number',
		default: 1,
	},
	limit: {
		type: SwaggerDefinitionConstant.NUMBER,
		required: false,
		description: 'Page Limit',
		default: 10,
	},
	start_date: {
		type: SwaggerDefinitionConstant.STRING,
		required: false,
		description: 'Start Date in UTC as ISO String(2020-06-16T09:31:16.698Z)',
	},
};