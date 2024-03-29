// @@ getUserDataById() in user service should have same attributes
export const UserDataFormat = (data: any,authData: any) => {
	return {
		_id: data._id || '',
		name: data.name || '',
		email: data.email || '',
		createdAt: data.createdAt || '',
		phoneNumber: data.phoneNumber || 0,
		countryCode: data.countryCode || '',
		signType: data.signType || '',
		isPhoneVerified: data.isPhoneVerified || false,
		isEmailVerified: data.isEmailVerified || false,
		status: data.status,
		latitude:data.latitude || 0,
		longitude:data.longitude || 0,
		pushNotification:data.pushNotification || false,
		emailNotification:data.emailNotification || false,
		profileImage:data.profileImage || '',
		address:data.address || '',
		userName:data.userName || '',
		isPrivate: data.isPrivate || false,
		referrer: authData?.referrer || '',
		referralCode: authData?.referralCode || '',
		bio:data?.bio || '',
		usertype:data?.usertype || '',
		score:authData?.usertype || 0,
		totalFollowings:authData?.totalFollowings || 0,
		totalFollowers:authData?.totalFollowers || 0,
		totalLinksUploaded:authData?.totalPosts || 0,
		isFollowed: authData?.isFollowed || false
	};
};