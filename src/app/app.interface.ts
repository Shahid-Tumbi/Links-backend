import * as express from 'express';
import { UserType, DeviceType } from './constants/user.constants';

export namespace App {
	export interface SessionUser {
		name: string;
	}

	export interface SessionData extends SessionUser {
		sessions: { [key: string]: boolean };
	}

	export interface Client {
		language: string;
		ipAddress: string;
		deviceId: string;
		deviceType: string;
		deviceModel: string;
		iso2: string;
	}

	export interface Module {
		story_template: number;
		user: number;
		pet: number;
		content: number;
		pet_category: number;
		sticker: number;
		hashtag: number;
		location: number;
		event: number;
		music: number;
		live: number;
		banner: number;
		chat: number;
		support: number;
		notification: number;
	}

	export interface Role {
		module: Module;
		access_level: string;
		all_country: string;  // 1 ,2 , 3
		country_id: string[];
		country: string[];
	}

	export interface User {
		type: UserType;
		id: string;
		session: string;
		role?: Role;
	}

	export interface Request<T = any> extends express.Request {
		data?: T;
		client?: Client;
		user?: User;
	}

	export type SuccessStatus = 200 | 201 | 202 | 204;

	export interface MessageData {
		EN: string;
		ES: string;
		ZH_HANS: string;
		ZH_HANT: string;
	}

	export interface Response extends express.Response {
		error(error: Error): void;
		success(message: MessageData | string, result?: any, options?: { status?: SuccessStatus, meta?: any }): void;
	}

	export interface PaginateOptions {
		page: number;
		limit: number;
	}

	export interface ListOptions extends PaginateOptions {
		search?: string;
		sort_by?: string;
		sort_order?: 'asc' | 'desc' | '1' | '-1';
	}

	export interface PasswordDoc {
		password: string;
		isModified(password: string): Promise<any>;
	}

	export interface IMetaResult {
		meta: any;
		result: any;
	}

	export interface PaginationData {
		type?: string;
		limit?: any;
		page?: any;
		search?: string;
		status?: string;
		device_id?: string;
		id?: number;
		offset?: number;
		sort_key?: string;
		sort_type?: string;
		device_type?: string;
		from_date?: string;
		to_date?: string;
		user_type?: string;
		country?: string;
		age_group?: string;
		gender?: string;
		created_by?: string;
	}

	export interface ContactData {
		phone_numbers: string[];
		emails: string[];
	}

	export interface UsernameData {
		name: string;
		phone_number: string;
		created_at: string;
	}

	export interface NotificationAdminData {
		title: string;
		description: string;
		type: string;
		account_type: string;
		url: string;
		country: any[];
		all_country: boolean;
	}
}