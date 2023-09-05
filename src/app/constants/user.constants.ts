export enum UserType {
	Guest = '0',
	User = '1',
	Admin = '2',
	Default = '3',
}

export enum UserStatus {
	Active = '1',
	InActive = '2',
	Deleted = '3',
}

export enum UserGender {
	Male = '1',
	Female = '2',
	Other = '3',
}

export enum DeviceType {
	IOS = '1',
	ANDROID = '2',
	WEB = '3',
}

export enum LoginType {
	// Normal = '0',
	Apple = '1',
	Google = '2',
	Facebook = '3',
	Normal = '4',
	Guest = '5',
}

export enum SORT {
	asc = 'asc',
	desc = 'desc',
}

export enum ContentType {
	Privacy_Policy = '1',
	Terms_And_Condition = '2',
	FAQ_Category = '3',
	FAQ = '4',
	About_Us = '5',
}

export enum AccessLevel {
	Admin = '1',
	SubAdmin = '2',
}

export enum RoleAccess {
	NONE = 1,
	Read = 2,
	Write = 3,
}

export enum AllCountryAccess {
	NONE = '1',
	OTHER = '2',
	ALL = '3',
}

export enum GlobalSearchType {
	Top = '0',
	User = '1',
	Pet = '2',
	Hashtag = '3',
	Event = '4',
}