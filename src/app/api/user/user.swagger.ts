/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { UserStatus } from '@src/app/constants';
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

// @ApiModel({
// description: 'ResendOtpData',
// name: 'ResendOtpData',
// })
// export class ResendOtpData {
// @ApiModelProperty({
// 	description: Object.entries(PrimaryField).map((val) => val.join(': ')).join(' | ') + ` (If no type is provided then otp with sent to primary field)`,
// 	required: false,
// 	type: SwaggerDefinitionConstant.STRING,
// 	example: Object.values(PrimaryField).join(' | ') as any,
// })
// type?: string;
// }

@ApiModel({
	name: 'ForgotPasswordData',
	description: '',
})
export class ForgotPasswordData {
	@ApiModelProperty({
		description: 'user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com | 9876543210' as any,
	})
	email: string;
}

@ApiModel({
	name: 'ResetPasswordData',
	description: '',
})
export class ResetPasswordData {
	@ApiModelProperty({
		description: 'JWT Token received from verify api(/forget-password/verify)',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'JWT TOKEN' as any,
	})
	token: string;
	@ApiModelProperty({
		description: 'New Password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '123456' as any,
	})
	password: string;
}

@ApiModel({
	name: 'VerifyForgetOtp',
	description: '',
})
export class VerifyForgetOtp {
	@ApiModelProperty({
		description: 'OTP Code',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1234' as any,
	})
	otp: string;
	@ApiModelProperty({
		description: 'JWT Token received from forget api(/forget-password)',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'JWT TOKEN' as any,
	})
	token: string;
}

@ApiModel({
	name: 'ResendPasswordOtp',
	description: '',
})
export class ResendPasswordOtp {
	@ApiModelProperty({
		description: 'JWT Token received from forget api(/forget-password)',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'JWT TOKEN' as any,
	})
	token: string;
}


@ApiModel({
	name: 'FollowData',
	description: '',
})
export class FollowData {
	userId!: string;
	@ApiModelProperty({
		description: 'Follow Status (true: follow | false: unfollow)',
		required: false,
		type: SwaggerDefinitionConstant.BOOLEAN,
	})
	status!: boolean;
}

@ApiModel({
	description: 'User Profile Status Update',
	name: 'UserProfileStatusUpdate',
})
export class UserProfileStatusUpdate {
	@ApiModelProperty({
		description: Object.entries(UserStatus).map((val) => val.join(': ')).join(' | '),
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: Object.values(UserStatus).join(' | ') as any,
	})
	status: string;
	@ApiModelProperty({
		description: 'Id of User',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	id: string;
}

@ApiModel({
	description: 'Change Password',
	name: 'ChangePassword',
})
export class PasswordData {
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
	name: 'ReportUser',
	description: 'Report a User',
})
export class ReportUserData {
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.STRING,
		required: true,
		description: 'Reason ID',
	})
	reason_id!: string;
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.STRING,
		required: false,
		description: 'Report Description',
	})
	description?: string;
	user_id!: string;
}

@ApiModel({
	name: 'DeviceToken',
	description: 'Device Token Data',
})
export class DeviceTokenData {
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.STRING,
		required: true,
		description: 'Device Token',
	})
	device_token!: string;
}

@ApiModel({
	name: 'UpdatePrivacy',
	description: 'Update Privacy Data',
})
export class UpdatePrivacyData {
	@ApiModelProperty({
		type: SwaggerDefinitionConstant.BOOLEAN,
		required: true,
		description: 'Privacy',
		example: false as any,
	})
	is_private!: boolean;
}
