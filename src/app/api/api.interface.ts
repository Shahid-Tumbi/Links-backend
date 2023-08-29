
// export namespace Api {
// 	export interface ListingResult {
// 		pageIndex: number;
// 		pageSize: number;
// 		total: number;
// 		data: any[];
// 	}
// 	// export interface OtpSenderData {}
// 	export interface UserSignInData {
// 		countryCode: string;
// 		mobile: string;
// 	}
// 	export interface UserVerificationData {
// 		id: string;
// 		otp: string;
// 	}
// 	export interface SignInResult {
// 		authToken: string;
// 		refreshToken: string;
// 	}

// 	export interface IHomeAPI {
// 		page: number;
// 		limit: number;
// 		address: string;
// 		is_klip?: boolean;
// 		hashtag_id: string;
// 	}

// 	export interface ISearchAPI {
// 		page: number;
// 		limit: number;
// 		search?: string;
// 		user_id: string;
// 		start_date?: string;
// 		type: string;
// 	}

// 	export interface SocialMix {
// 		page: number;
// 		limit: number;
// 	}

// 	// export interface EntityOptions {
// 	// 	auth?: UserType | UserType[];
// 	// 	schema?: JoiObject;
// 	// }
// 	// export interface EntityCustomOptions {}
// 	export interface IListData {
// 		pageIndex: number;
// 		pageSize: number;
// 		searchText?: string;
// 		sort_by?: string;
// 		sort_order?: 'asc' | 'desc';
// 	}
// 	export interface BootstarpService {
// 		bootstrap(): Promise<any>;
// 	}
// }

// export interface IPoint {
// 	type: 'Point';
// 	coordinates: number[];
// }

// export interface IGraphData {
// 	month?: number;
// 	year?: number;
// 	type: string;
// 	range?: {
// 		from_date: string;
// 		to_date: string;
// 	};
// }

export enum DashboardType {
	TopList = '1',
	Graph = '2',
}