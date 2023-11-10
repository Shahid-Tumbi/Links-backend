
export namespace INotification {
	export interface Doc {
		_id: string;
		fromUser: string;
		toUser: string;
		notificationType: string;
		content: string;
		title: string;
	}


	export interface INotificationFilter {
		page: number;
		limit: number;
		_id?: string;
		fromUser?: string;
		toUser?: string;
		app?:string;
	}
}