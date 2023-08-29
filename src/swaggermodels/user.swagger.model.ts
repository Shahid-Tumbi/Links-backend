import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { IAddress } from '@api/user/user.interface';
import { LoginType, UserGender, DeviceType } from '@src/app/constants';

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
		example: 'Admin@@321' as any,
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
	description: 'User Authenticate',
	name: 'UserAuthenticate',
})

export class UserAuthenticate {
	@ApiModelProperty({
		description: 'user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test@yopmail.com | 9876543210' as any,
	})
	user: string;
	@ApiModelProperty({
		description: 'type',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	country_code: string;
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
		example: 'test@yopmail.com | 9876543210' as any,
	})
	user: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@@321' as any,
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

@ApiModel({
	name: 'UserAddressModel',
	description: 'User/Post Address',
})
export class UserAddressModel implements IAddress {
	@ApiModelProperty({
		description: 'User Address City',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Noida' as any,
	})
	city: string;
	@ApiModelProperty({
		description: 'User Address Region',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Delhi' as any,
	})
	region: string;
	@ApiModelProperty({
		description: 'User Address Country',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'India' as any,
	})
	country: string;
	@ApiModelProperty({
		description: 'User Full Address',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Noida, Delhi, India' as any,
	})
	fullAddr: string;
}

@ApiModel({
	name: 'UserLocationModel',
	description: 'User Location',
})
// export class UserLocationModel implements IPoint {
// 	type: 'Point' = 'Point';
// 	@ApiModelProperty({
// 		description: 'User Location Coordinates',
// 		required: true,
// 		type: SwaggerDefinitionConstant.ARRAY,
// 		example: [0, 0],
// 	})
// 	coordinates: number[];
// }


@ApiModel({
	name: 'UserProfileModel',
	description: 'Profile Steps',
})
export class UserProfileModel {
	@ApiModelProperty({
		description: 'A Unique Name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test123' as any,
	})
	user_name: string;
	@ApiModelProperty({
		description: 'Profile Picture Url',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	profile_url: string;
	@ApiModelProperty({
		description: 'Profile Picture Thumbnil Url',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	thumb_url: string;
	@ApiModelProperty({
		description: Object.entries(UserGender).map((val) => val.reverse().join(': ')).join(' | '),
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: Object.values(UserGender).join(' | ') as any,
	})
	gender: string;
	@ApiModelProperty({
		description: 'User Bio',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'I am Test User, a technology lover.' as any,
	})
	bio: string;
	// @ApiModelProperty({
	// 	description: 'User Bio',
	// 	required: false,
	// 	type: SwaggerDefinitionConstant.OBJECT,
	// 	model: 'UserLocationModel'
	// })
	// location: IPoint;
	@ApiModelProperty({
		description: 'User Bio',
		required: false,
		type: SwaggerDefinitionConstant.OBJECT,
		model: 'UserAddressModel',
	})
	address: IAddress;
	@ApiModelProperty({
		description: 'User Interests',
		required: false,
		type: SwaggerDefinitionConstant.ARRAY,
		example: ['Category Id']
	})
	interests: string[];
	@ApiModelProperty({
		description: 'User has Other Interests',
		required: false,
		type: SwaggerDefinitionConstant.BOOLEAN,
	})
	other_interests: boolean;
}

@ApiModel({
	description: 'Reset password',
	name: 'UserResetPassword',
})
export class UserResetPassword {
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '120456786' as any,
	})
	password: string;
}

@ApiModel({
	description: 'reset password',
	name: 'UserResendOtp',
})
export class UserResendOtp {
	@ApiModelProperty({
		description: 'countryCode',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	countryCode: string;
	@ApiModelProperty({
		description: 'phone no of user',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '9990456786' as any,
	})
	phoneNo: string;
}

@ApiModel({
	description: 'Reset password',
	name: 'UserForgetPassword',
})
export class UserForgetPassword {
	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'abc@yopmail.com' as any,
	})
	email: string;

}

@ApiModel({
	description: 'Verify password',
	name: 'UserVerifyForgotPasswordOtp',
})
export class UserVerifyForgotPasswordOtp {
	@ApiModelProperty({
		description: 'otp',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1234' as any,
	})
	otp: string;

	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'abc@yopmail.com' as any,
	})
	email: string;

}

@ApiModel({
	description: 'UserChangePassword',
	name: 'UserChangePassword',
})
export class UserChangePassword {
	@ApiModelProperty({
		description: 'new password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '123456' as any,
	})
	password: string;
	@ApiModelProperty({
		description: 'reset token',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'aahscdshfdwhjcvhjew' as any,
	})
	resetToken: string;

}

@ApiModel({
	description: 'Social Login',
	name: 'UserSocialLogin',
})
export class UserSocialLogin {
	@ApiModelProperty({
		description: Object.entries(LoginType).map((val) => val.reverse().join(': ')).join(' | '),
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: [LoginType.Apple, LoginType.Google, LoginType.Facebook].join(' | ') as any,
	})
	sign_type: string;
	@ApiModelProperty({
		description: 'token',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'scvhdsvchdscs' as any,
	})
	token: string;
	@ApiModelProperty({
		description: 'name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Kpuser' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'email',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'abcd@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'country_code',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	country_code: string;
	@ApiModelProperty({
		description: 'phone_number',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	phone_number: string;
	@ApiModelProperty({
		description: 'image_url',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'http://image.com' as any,
	})
	image_url: string;
	@ApiModelProperty({
		description: 'device_token',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'dshgkjfdskjkjdf' as any,
	})
	device_token: string;
	@ApiModelProperty({
		description: 'Device Model',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Samsung' as any,
	})
	device_model: DeviceType;
	@ApiModelProperty({
		description: Object.entries(DeviceType).map((val) => val.reverse().join(': ')).join(' | '),
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: Object.values(DeviceType).join(' | ') as any,
	})
	device_type: string;
	@ApiModelProperty({
		description: 'voip_token',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'kjdskjdslkjfdslkfdslkfdslkfdslklkfds' as any,
	})
	voip_token: string;
}
