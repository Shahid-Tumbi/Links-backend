import { DeviceType, LoginType, UserGender, UserStatus } from '@app/constants';



export namespace IUser {
	export interface Doc {
		userId: string;
		totalFollowers :  number,
		totalFollowings :  number
	}
	export interface User {
		_id: string;
		name: string;
		userName: string;
		email: string;
		password: string;
		countryCode: string;
		phoneNumber: string;
		isPhoneVerified: boolean;
		isEmailVerified: boolean;
		profileImage:string;
		status: string;
		latitude: Number;
		longitude: Number;
		pushNotification: boolean;
		emailNotification: boolean;
		customerId:string;
		paymentMethod:string;
		referrer:string;
		otp: {
			otpCode: {
				type: String;
			};
			expireTime: {
				type: Number;
			};
		},
		isPrivate: boolean;
		deviceToken:string
	}
}


export interface ISocialData {
	apple_id?: string;
	gmail_id?: string;
	facebook_id?: string;
}

export enum AgeGroup {
	Below_18 = '1',
	Btw_18_24 = '2',
	Btw_25_34 = '3',
	Btw_35_44 = '4',
	Btw_45_54 = '5',
	Btw_55_64 = '6',
	Above_65 = '7',
}

export enum PrimaryField {
	Phone_Number = '1',
	Email = '2',
}

export enum PasswordWith {
	Phone = '0',
	Email = '1',
}

export enum UserSearchType {
	User = 1,
	Pet = 2,
	Both = 3,
}

export interface IOtpData {
	otpCode: string;
	expireTime: number;
}

export interface IOtp {
	email: IOtpData & { value: string };
	phone: IOtpData & { value: string };
	password: IOtpData & { token: string };
}

export interface IAuthData {
	id?: string;
	countryCode?: string;
	user: string;
}

export interface ILoginData extends IAuthData {
	password: string;
	deviceToken?: string;
}
export interface IChangePassword extends IAuthData {
	old_password: string;
	new_password:string;
	id?: string;
}

export interface IRegisterData {
	name: string;
	email: string;
	password: string;
	countryCode: string;
	phoneNumber: string;
	deviceToken?: string;
	primaryField: PrimaryField;
	userName: string;
	userId: string;
}

export interface IUserSocialLogin extends IUserSession {
	email?: string;
	name?: string;
	token: string;
	country_code?: string;
	phone_number?: string;
	primary_field: string;
}

export interface IUserSession {
	device_token?: string;
	device_model?: string;
	device_type?: DeviceType;
	sign_type?: LoginType;
	voip_token?: string;
	ip_address?: string;
}

export interface UserData {
	id?: string;
	email?: string;
	country_code?: string;
	phone_number?: string;
	language?: string;
	social?: ISocialData;
	name?: string;
	age_group?: string;
	gender?: UserGender;
	is_phone_verified?: boolean;
	is_email_verified?: boolean;
	password?: string;
	otp?: IOtpData;
	profile_url?: string;
	thumb_url?: string;
	user_name?: string;
	location?: string;
	description?: string;
	status?: UserStatus;
	primary_account_id?: string;
	located_country?: any;
	post_count?: number;
	followers_count?: number;
	pets?: string[]; // contains all pet profile ids
	following_count?: number;
	interests?: string[]; // contains category ids
	profile_steps?: number[];
}

export interface IAddress {
	city: string;
	region: string;
	country: string;
	fullAddr: string;
}

export interface IUserStatusUpdate {
	id: string;
	status: UserStatus;
}

export interface IUserSearchOptions {
	page: number;
	limit: number;
	search?: string;
}

export interface ISearchOptions extends IUserSearchOptions {
	type: UserSearchType;
}

export interface IPeopleOptions {
	search?: string;
	page: number;
	limit: number;
	start_date: string;
}

export interface IActivityOptions {
	userId: string;
	category: string;
	type?: string;
	page?: number;
	limit?: number;
	recent_activity?: boolean;
}

export interface IFollowerOptions {
	page: number;
	limit: number;
	userId: string;
}

export interface INearByOptions {
	page: number;
	limit: number;
	radius: number;
	isGroup: boolean;
	latitude: number;
	longitude: number;
}

export enum UserDashboard {
	Top_List = '1',
	Graph = '2',
}

export interface ILogoutData {
	userId: string;
	deviceToken?: string;
}
export interface FollowData {
	followerId: string;
	followingId: string;
}