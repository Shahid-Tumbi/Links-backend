import { firebaseAdmin } from "@src/firbase/firebase-config";


exports.notificationUtil = async(notifiData:any) =>{
	
	try{
        // const  to = notifiData.to
		// console.log("data", notifiData)   
		// const notification = data.message
		// const notification_options = {
		// 	tokens: notifiData.to,
			
		//   };
		// const data =  notification_options
		const notificationData={
			notification: notifiData.notification,
			data: {
					notifee: JSON.stringify({
						body: notifiData.notification.body,
						android: {
							channelId: "default"
						},
						id:notifiData.notification.id
					})
				}
		}
		 firebaseAdmin.messaging().sendToDevice(notifiData.to,notificationData).then( (resp:any) => {
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