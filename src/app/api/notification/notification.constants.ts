import { defineMessage } from '@utils/common.util';

export const NOTIFICATION_MESSAGES = {
	REGISTER: {
		SUCCESS: defineMessage(
			'You are successfully registered',
			'estás registrado exitosamente',
			'您已成功注册',
			'您已成功註冊',
		),
		REVIEW_EXISTS: defineMessage(
			'Oops! Review is already submitted',
			'¡Ups! Ya se envió la reseña',
			'哎呀！审核已提交',
			'哎呀！審核已提交',
		),
		PHONE_EXISTS: defineMessage(
			'Oops! This Phone no is already registered with Us',
			'¡Uy! Este número de teléfono ya está registrado con nosotros',
			'糟糕！ 该电话号码已在我们注册',
			'糟糕！ 該電話號碼已在我們註冊',
		),
	},
	REQUEST_MESSAGE:{
		CREATE:{
			CONTENT:"Photoshoot request created by",
			TITLE:"Request Create"
		},
		SENT_CODE:{
			CONTENT:'Your verification code is',
			TITLE:'Booking Verification Code',
			SUCCESS:'Code sent successfully',
		},
		UPDATE:{
			CONTENT:"Photoshoot request ",
			TITLE:"Request Update"
		}
	}
};

export const COLLECTION_NAME = "notification";

export const BY_PASS_OTP = '1234';

export const passwordKey = '_p';

export const DB_PROJECTION = {
	USER_PROJECTION: {
		_id: 1,
		rating: 1,
		review: 1,
		userId: 1,
		photographerId: 1,
		createdAt: 1,
		requestId: 1
	}
}