import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';

/* tslint:disable:max-classes-per-file */
@ApiModel({
	description: 'User Add',
	name: 'UserRegister',
})
export class UserRegister {
	@ApiModelProperty({
		description: 'Device Token to send notifications',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	deviceToken: string;
	@ApiModelProperty({
		description: 'A Unique Name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test_123' as any,
	})
	userName:string;
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
		description: 'password',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@321' as any,
	})
	password: string;
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
	description: 'Login User',
	name: 'UserLogin',
})
export class UserLogin {
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
		example: 'test@yopmail.com | test_123' as any,
	})
	user: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@321' as any,
	})
	password: string;
	@ApiModelProperty({
		description: 'Dial Code',
		required: false,
		type: SwaggerDefinitionConstant.OBJECT,
		example: '+91' as any,
	})
	countryCode: string;
}

