/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';


@ApiModel({
	description: 'Create FAQ Admin',
	name: 'AdminCreateFAQ',
})
export class AdminCreateFAQ {
	// 	question
	// answer
	// lang
	// userType
	@ApiModelProperty({
		description: 'FAQ question',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'How to login?' as any,
	})
	question: string;
	@ApiModelProperty({
		description: 'FAQ answer',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'I dont know' as any,
	})
	answer: string;
	@ApiModelProperty({
		description: 'language',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'EN' as any,
	})
	lang: string;
	@ApiModelProperty({
		description: 'usertype admin/user/photographer',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'UserType' as any,
	})
	userType: string;
}



@ApiModel({
	description: 'Update FAQ Admin',
	name: 'AdminUpdateFAQ',
})
export class AdminUpdateFAQ {
	@ApiModelProperty({
		description: 'FAQ question',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'How to login?' as any,
	})
	question: string;
	@ApiModelProperty({
		description: 'FAQ answer',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'I dont know' as any,
	})
	answer: string;
	@ApiModelProperty({
		description: 'language',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'EN' as any,
	})
	lang: string;
	@ApiModelProperty({
		description: 'usertype admin/user/photographer',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'UserType' as any,
	})
	userType: string;
	@ApiModelProperty({
		description: 'status',
		required: true,
		type: SwaggerDefinitionConstant.BOOLEAN,
		example: 'status' as any,
	})
	status: boolean;
}