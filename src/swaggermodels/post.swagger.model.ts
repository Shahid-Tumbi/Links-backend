import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
@ApiModel({
	description: 'Post Create',
	name: 'CreatePost',
})
export class CreatePost {
    @ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	userId: string;
    @ApiModelProperty({
		description: 'Post title',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'First post' as any,
	})
	title: string;
    @ApiModelProperty({
		description: 'Post content',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'content description' as any,
	})
	content: string;
    @ApiModelProperty({
		description: 'link that you want to share in post',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'https://www.google.com' as any,
	})
	link: string;
}
@ApiModel({
	description: 'Post detail',
	name: 'UpdatePost',
})
export class UpdatePost { 
    @ApiModelProperty({
		description: 'Post title',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'First post' as any,
	})
	title: string;
    @ApiModelProperty({
		description: 'Post content',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'content description' as any,
	})
	content: string;
    @ApiModelProperty({
		description: 'link that you want to share in post',
		type: SwaggerDefinitionConstant.STRING,
		example: 'https://www.google.com' as any,
	})
	link: string;
}
@ApiModel({
	description: 'Post like',
	name: 'LikePost',
})
export class  LikePost{ 
    @ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	userId: string;
    @ApiModelProperty({
		description: 'Post Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	postId: string;
}
@ApiModel({
	description: 'Comment on Post',
	name: 'CommentPost',
})
export class  CommentPost{ 
    @ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	userId: string;
    @ApiModelProperty({
		description: 'Post Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	postId: string;
    @ApiModelProperty({
		description: 'Parent comment Id (if it is replied comment)',
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	parentId: string;
    @ApiModelProperty({
		description: 'Comment content',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'content description' as any,
	})
	content: string;
}
@ApiModel({
	description: 'Update Comment on Post',
	name: 'CommentUpdate',
})
export class  CommentUpdate{ 
    @ApiModelProperty({
		description: 'Comment content',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'content description' as any,
	})
	content: string;
}
@ApiModel({
	description: 'Share Post',
	name: 'SharePost',
})
export class  SharePost{ 
    @ApiModelProperty({
		description: 'User Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	userId: string;
    @ApiModelProperty({
		description: 'Post Id',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: '5erre5-refd45yuyu-dsdsfd-43fdd' as any,
	})
	postId: string;
}