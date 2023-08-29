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
		_id?: string;
		name?: string;
		search?: string;
	}
	export interface IPhotographerFilter {
		page: number;
		limit: number;
		_id?: string;
		userId?: string;
		requestStatus?: string;
		photographerId?: string;
		paymentStatus?: string;
	}
	export interface FetchPhotographerRequest {
		_id: string;
		page: number;
		limit: number;
		name?: string;
	}

	export interface PhotographerRequestids{
		_id:string;
	}
	export interface IPhotographer {
		page: number;
		limit: number;
		_id?: string;
		name?: string;
		search?: string;
		avrageRating?: number;
		onlinePortfolio?: string;
		instagramHandle?: string;
		facebookProfile?: string;
		twitterHandle?: string;
		photographerWorkExperience?: number;
		aboutPhotographer?: string;
		perWeekShootingHours?: number;
		cameraTypes?: string;
	}

	export interface IPhotographerUpdate {
		_id?: string;
		name?: string;
		expertiseLevel?: number;
		timePeriod?: Array<string>;
		latitude?: number;
		longitude?: number;
	}
}