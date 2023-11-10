import { firebaseAdmin } from "@src/firbase/firebase-config";


exports.notificationUtil = async(notifiData:any) =>{
	
	try{
        // const  to = notifiData.to
		// const notification = data.message
		// const notification_options = {
		// 	tokens: notifiData.to,
			
		//   };
		// const data =  notification_options
		const notificationData={
			token:notifiData.token,
			notification: notifiData.notification,
			data: {
					notifee: JSON.stringify({
						body: notifiData.notification.body,
						android: {
							channelId: "default"
						},
						id:notifiData.id
					})
				}
		}
		 firebaseAdmin.messaging().send(notificationData).then( (resp:any) => {
			console.log(JSON.stringify(resp))
		    return resp	;
		   
		  })
		  .catch( (error:any) => {
			  console.log('error',error);
		  });
		// await firebaseAdmin.messaging().sendMulticast(notification_options)
		//   .then( (resp:any) => {
		// 	console.log(resp)
		//     return resp	;
		   
		//   })
		//   .catch( (error:any) => {
		// 	  console.log(error);
		//   });

    } catch(error){
        console.log(error)
    }
}