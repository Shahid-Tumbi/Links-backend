import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';

@ApiModel({
		description: 'User List',
		name: 'ReqAdminUserList',
})

export class ReqAdminUserListModel {
		@ApiModelProperty({
				description: 'email',
				required: true,
				type: SwaggerDefinitionConstant.STRING,
				example: 'abc@yopmail.com' as any,
		})
		email: string;
		@ApiModelProperty({
				description: 'password',
				required: true,
				type: SwaggerDefinitionConstant.STRING,
				example: '120456786' as any,
		})
		password: string;

}
