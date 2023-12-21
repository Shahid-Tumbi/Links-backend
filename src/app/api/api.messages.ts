import { defineMessage } from '@utils/common.util';

export const API_MESSAGES = {
	NOT_ALLOWED: defineMessage(
		'Oops! You are not allowed to perform this action'
	),
	INTERNAL: defineMessage(
		'Internal server error occurred',
		'Se produjo un error interno del servidor',
		'发生内部服务器错误',
		'發生內部服務器錯誤',
	),
	TOKEN: {
		EXPIRED: defineMessage(
			'Provided token is expired',
			'El token provisto ha caducado',
			'提供的令牌已过期',
			'提供的令牌已過期',
		),
		INVALID: defineMessage(
			'Invalid token provided',
			'Token no válido proporcionado',
			'提供的令牌无效',
			'提供的令牌無效',
		),
	},
	USER_NOT_VERIFIED: defineMessage(
		'Verify this account first before performing any action',
		'Verifique esta cuenta primero antes de realizar cualquier acción',
		'在执行任何操作之前，请先验证此帐户',
		'在執行任何操作之前，請先驗證此帳戶',
	),
};

export const SMS_MESSAGE_TEMPLATE = {
	SIGN_UP_OTP: `<#> Dear Name,\
	\nUse OTP OTP_NUMBER to verify your mobile number on WTF Club.\
	\nWTF Club doesn't ask for OTP or Mobile number to be shared with any one including WTF Club team.\
	\nGeuTgRpfx+y`,
	RESEND_OTP: `<#> Hello Name!\
	 \nUse this as OTP OTP_NUMBER\
	\n\nRegards\
	\nLinks Team.\
	\nGeuTgRpfx+y`,
};

export const ADMIN_NOTIFICATION_TITLE = {
	PIC: `WTF Club removed your pic because it doesn't follow our guidelines.Read our guidelines for posting content. Tap to see pic.`,
	KLIP: `WTF CLub removed your klip because it doesn't follow our guidelines.Read our guidelines for posting content. Tap to see klip.`,
	STORY: `WTF CLub removed your story because it doesn't follow our guidelines.Read our guidelines for posting content. Tap to see story.`,
	EVENT: `WTF CLub removed your event because it has been reported multiple times.Tap to see event.`,
	COMMENT: (comment: string) => {
		return `WTF CLub removed your comment ${comment} because it doesn't pass our community guidelines. Tap to see the comment.`;
	}
};