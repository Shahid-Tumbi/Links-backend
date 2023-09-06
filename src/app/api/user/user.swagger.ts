/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
// import { IPoint } from '../api.interface';

// export * from './banner/banner.swagger';
// export * from './contact/contact.swagger';
// export * from './connection/connection.swagger';
// export * from './verification/verification.swagger';

@ApiModel({
	description: 'VerifyOtpData',
	name: 'VerifyOtpData',
})
export class VerifyOtpData {
	@ApiModelProperty({
		description: '4 Digit Otp Code',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1234' as any,
	})
	otp: string;
}

@ApiModel({
description: 'ResendOtpData',
name: 'ResendOtpData',
})
export class ResendOtpData {
}

@ApiModel({
	name: 'ForgotPasswordData',
	description: '',
})
export class ForgotPasswordData {
	@ApiModelProperty({
		description: 'user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com' as any,
	})
	email: string;
}

@ApiModel({
	description: 'Change Password',
	name: 'ChangePasswordData',
})
export class PasswordData {
	@ApiModelProperty({
		description: 'Id of User',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	id: string;
	@ApiModelProperty({
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		description: 'Old Password',
		example: '{password}' as any,
	})
	old_password: string;
	@ApiModelProperty({
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		description: 'New Password',
		example: '{password}' as any,
	})
	new_password: string;
}

@ApiModel({
	name: 'UpdateUserData',
	description: 'Update User Data',
})
export class UpdateUserData {
	@ApiModelProperty({
		description: 'name of user',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Test User' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'latitude',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '21.170240' as any,
	})
	latitude:string;
	@ApiModelProperty({
		description: 'longitude',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '72.831062' as any,
	})
	longitude:string;
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.BOOLEAN,
		required: false,
		description: 'pushNotification',
		example: false as any,
	})
	pushNotification:string;
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.BOOLEAN,
		required: false,
		description: 'emailNotification',
		example: false as any,
	})
	emailNotification:string;
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.STRING,
		required: false,
		description: 'profileImage',
		example: "" as any,
	})
	profileImage:string;
}
