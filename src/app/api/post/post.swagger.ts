import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
@ApiModel({
	description: 'Post Module',
	name: 'PostModel',
})
export class PostModel{
    @ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	userId: string;
}