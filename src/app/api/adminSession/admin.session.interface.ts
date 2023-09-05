import { UserType, DeviceType, LoginType } from '@src/app/constants';

export interface IUserSession {
	deviceType?: string;
	deviceModel?: string;
	deviceToken?: string;
	voipToken?: string;
	ipAddress?: string;
	signType?: LoginType;
	userType?: UserType;
	deviceId?: string;
	userId?: string;
	_id?: string;
}