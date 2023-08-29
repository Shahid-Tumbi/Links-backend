// @@ getUserDataById() in user service should have same attributes
export const ReviewDataFormat = (data: any) => {
	return {
		_id: data._id || '',
		fromUser: data.fromUser || '',
		toUser: data.toUser || '',
		notificationType: data.notificationType || '',
		content: data.content || '',
		title: data.title || '',
		requestId: data.requestId || '',
	};
};