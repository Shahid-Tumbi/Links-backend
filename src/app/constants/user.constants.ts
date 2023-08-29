export enum UserType {
	Guest = '0',
	User = '1',
	Admin = '2',
	Default = '3',
	PhotoGrapher = '4'
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
 export enum SmsCred{
	Sid='ACa01c09d91b96d9d28f5345c9d13d2444',
	authToken='4540e7e0bb2915d8132e97a63b97930f',
	messagingSid='MGa1aa9ed38e2ee0406ab256dc107f83d9'
	// BaseUrl = 'https://api-app2.simpletexting.com/v2/api/messages'
	
 }