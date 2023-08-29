export namespace IAdmin {

	export interface Doc {
		_id: string;
		name: string;
		email: string;
		password: string;
		status: string;
	}

	export interface ILoginData {
		email: string;
		password: string;
		countryCode?: string;
		deviceToken?: string;
	}

	export interface ILogoutData {
		adminId: string;
		deviceToken?: string;
	}

	export interface IUsers {
		page: number;
		limit: number;
	}

	export interface IFAQ {
		page?: number;
		limit?: number;
		_id?: string;
	}
}