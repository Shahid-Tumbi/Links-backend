/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';


@ApiModel({
	description: 'Login Admin',
	name: 'AdminLoginData',
})
export class AdminLoginData {
	@ApiModelProperty({
		description: 'Device Token to send notifications',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	deviceToken: string;
	@ApiModelProperty({
		description: 'user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@321' as any,
	})
	password: string;
}

@ApiModel({
	description: 'Logout Admin',
	name: 'AdminLogoutData',
})
export class AdminLogoutData {
	@ApiModelProperty({
		description: 'Device Token to send notifications',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	deviceToken: string;
	@ApiModelProperty({
		description: 'user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'mongo_id' as any,
	})
	adminId: string;
}

@ApiModel({
	description: 'Admin Add User',
	name: 'AddUserAdmin',
})
export class AddUserAdmin {
	@ApiModelProperty({
		description: 'name of user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Test User' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'email of user',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'countryCode',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	countryCode: string;
	@ApiModelProperty({
		description: 'phone no of user',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '9876543210' as any,
	})
	phoneNumber: string;
}



@ApiModel({
	description: 'Admin UpdateUserAdmin User',
	name: 'UpdateUserAdmin',
})
export class UpdateUserAdmin {
	@ApiModelProperty({
		description: 'name of user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Test User' as any,
	})
	name: string;
}

@ApiModel({
	description: 'Admin Add User',
	name: 'AddPhotographerAdmin',
})
export class AddPhotographerAdmin {
	@ApiModelProperty({
		description: 'name of user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Test User' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'email of user',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'countryCode',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	countryCode: string;
	@ApiModelProperty({
		description: 'phone no of user',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '9876543210' as any,
	})
	phoneNumber: string;
}


@ApiModel({
	description: 'Admin Add User',
	name: 'searchPhotographerAdmin',
})
export class searchPhotographerAdmin {
	@ApiModelProperty({
		description: 'current page',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	page: string;
	@ApiModelProperty({
		description: 'record list',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '5' as any,
	})
	limit: string;
	@ApiModelProperty({
		description: 'search what you want',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test' as any,
	})
	search: string;
}

@ApiModel({
	description: 'Admin Add User',
	name: 'PhotographerRequestModel',
})
export class PhotographerRequestModel {
	@ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	userId: string;
	@ApiModelProperty({
		description: 'photographerId Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	photographerId: string;
	@ApiModelProperty({
		description: 'location in array latitude longitude Id',
		required: true,
		type: SwaggerDefinitionConstant.ARRAY,
		example: '1' as any,
	})
	eventLocation: any;
	@ApiModelProperty({
		description: 'shooteDate',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	shooteDate: any;
	@ApiModelProperty({
		description: 'startTime',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	startTime: any;
	@ApiModelProperty({
		description: 'duration',
		required: true,
		type: SwaggerDefinitionConstant.NUMBER,
		example: '1' as any,
	})
	duration: any;
}