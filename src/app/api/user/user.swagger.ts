/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { BY_PASS_OTP } from './user.constants';
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
		example: BY_PASS_OTP as any,
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
		description: 'users email,phone or username',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com || 9879279897 || test123'  as any,
	})
	user: string;
}
@ApiModel({
	name: 'ResetPassword',
	description: 'reset password',
})
export class ResetPassword {
	@ApiModelProperty({
		description: 'auth token',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'authToken'  as any,
	})
	token: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@123'  as any,
	})
	password: string;
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
		description: 'Device Token to send notifications',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'device token' as any,
	})
	deviceToken: string;
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
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.BOOLEAN,
		required: false,
		description: 'User profile is private or public',
		example: false as any,
	})
	isPrivate:string;
}
@ApiModel({
	description: 'Logout User',
	name: 'LogoutData',
})
export class LogoutData {
	@ApiModelProperty({
		description: 'Device Token to send notifications',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'device token' as any,
	})
	deviceToken: string;
	@ApiModelProperty({
		description: 'Id of User',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	userId: string;
}
@ApiModel({
	description: 'Follow User',
	name: 'FollowUser',
})
export class FollowUser {
	@ApiModelProperty({
		description: 'Id of User that Follow someone',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	followerId: string;
	@ApiModelProperty({
		description: 'Id of User that follow by someone',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	followingId: string;
}
