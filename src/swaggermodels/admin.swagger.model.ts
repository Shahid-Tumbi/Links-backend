import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';

@ApiModel({
	description: 'Admin Login',
	name: 'ReqAdminLogin',
})

export class ReqAdminLoginModel {
	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'adminsocial@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@123' as any,
	})
	password: string;

}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Admin Login',
	name: 'ReqAdminForgotPassword',
})

export class ReqAdminForgotPasswordModel {
	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'adminsocial@yopmail.com' as any,
	})
	email: string;

}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Admin Reset Password',
	name: 'ReqAdminResetPassword',
})

export class ReqAdminResetPasswordModel {
	@ApiModelProperty({
		description: 'token',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'ewdsyjdsdsiudsskjdkjsdkjdskjds' as any,
	})
	token: string;
	@ApiModelProperty({
		description: 'password',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '123456@Kpr' as any,
	})
	password: string;
}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Admin Change Password',
	name: 'ReqAdminChangePassword',
})

export class ReqAdminChangePasswordModel {
	@ApiModelProperty({
		description: 'old',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '123456' as any,
	})
	old: string;
	@ApiModelProperty({
		description: 'current',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '12345678' as any,
	})
	password: string;

}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Admin Update Profile',
	name: 'ReqAdminUpdateProfile',
})

export class ReqAdminUpdateProfileModel {
	@ApiModelProperty({
		description: 'profile photo',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'https://images.app.goo.gl/KHxxwdeYHNPVjcgz6' as any,
	})
	profile_url: string;
	@ApiModelProperty({
		description: 'name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'rahul' as any,
	})
	name: string;

}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Add Sub Admin',
	name: 'AddSubAdmin',
})

export class AddSubAdminModel {
	@ApiModelProperty({
		description: 'name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'name' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'role',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'roleId' as any,
	})
	role: string;

	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'subAdmin1@yopmail.com' as any,
	})
	email: string;

	@ApiModelProperty({
		description: 'gender',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Male' as any,
	})
	gender: string;

	@ApiModelProperty({
		description: 'phone_number',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '9456791232' as any,
	})
	phone_number: string;

	@ApiModelProperty({
		description: 'country',
		required: false,
		type: SwaggerDefinitionConstant.ARRAY,
		model: 'AdminCountry',
	})
	country?: AdminCountrySwaggerModel[];

	@ApiModelProperty({
		description: 'all_country',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '1 , 2 , 3' as any,
	})
	all_country?: string;

	@ApiModelProperty({
		description: 'country_code',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	country_code?: string;
}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Update Sub Admin',
	name: 'UpdateSubAdmin',
})

export class UpdateSubAdminModel {
	@ApiModelProperty({
		description: 'id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'qwer-2sdfd-1234' as any,
	})
	id: string;
	@ApiModelProperty({
		description: 'name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'name' as any,
	})
	name: string;
	@ApiModelProperty({
		description: 'role',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'roleId' as any,
	})
	role: string;
	@ApiModelProperty({
		description: 'email',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'subAdmin1@yopmail.com' as any,
	})
	email: string;
	@ApiModelProperty({
		description: 'gender',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Male' as any,
	})
	gender: string;
	@ApiModelProperty({
		description: 'phone_number',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '9456791232' as any,
	})
	phone_number: string;
	@ApiModelProperty({
		description: 'country',
		required: false,
		type: SwaggerDefinitionConstant.ARRAY,
		model: 'AdminCountry',
	})
	country?: AdminCountrySwaggerModel[];

	@ApiModelProperty({
		description: 'all_country',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '1 , 2 , 3' as any,
	})
	all_country?: string;

	@ApiModelProperty({
		description: 'country_code',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '+91' as any,
	})
	country_code?: string;
}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Admin Country',
	name: 'AdminCountry',
})
export class AdminCountrySwaggerModel {
	@ApiModelProperty({
		description: 'Country id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '48eb9ef2-7a6d-40d0-a249-b868faf16633' as any,
	})
	id: string;

	@ApiModelProperty({
		description: 'name',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'India , America' as any,
	})
	name: string;

	@ApiModelProperty({
		description: 'phone_code',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'IND , KN' as any,
	})
	phone_code: string;
}

// tslint:disable-next-line: max-classes-per-file
@ApiModel({
	description: 'Update Role Status',
	name: 'SubAdminStatusUpdate',
})
export class UpdateSubAdminStatusSwagger {
	@ApiModelProperty({
		description: '1 for active , 2 for inactive , 3 for delete',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1 , 2  , 3' as any,
	})
	status: string;
}
