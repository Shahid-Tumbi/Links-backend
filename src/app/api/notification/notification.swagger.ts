/* tslint:disable:max-classes-per-file */

import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from 'swagger-express-ts';
// import { IPoint } from '../api.interface';

// export * from './banner/banner.swagger';
// export * from './contact/contact.swagger';
// export * from './connection/connection.swagger';
// export * from './verification/verification.swagger';

@ApiModel({
	description: 'Notification Module',
	name: 'NotificationModel',
})
export class NotificationModel {
		
	@ApiModelProperty({
		description: 'message send from ',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '' as any,
	})
	fromUser: string;
	@ApiModelProperty({
		description: 'message send to ',
		required: true,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Test User' as any,
	})
	toUser: string;
	@ApiModelProperty({
		description: 'notification type',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: '1' as any,
	})
	notificationType: string;
	@ApiModelProperty({
		description: 'message body',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'Admin@@321' as any,
	})
	content: string;
	@ApiModelProperty({
		description: 'message title',
		required: false,
		type: SwaggerDefinitionConstant.STRING,
		example: 'test title' as any,
	})
	title: string;
}
