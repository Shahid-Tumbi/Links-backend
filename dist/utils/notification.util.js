"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_config_1 = require("../firbase/firebase-config");
exports.notificationUtil = (notifiData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const  to = notifiData.to
        // const notification = data.message
        // const notification_options = {
        // 	tokens: notifiData.to,
        //   };
        // const data =  notification_options
        const notificationData = {
            token: notifiData.token,
            notification: notifiData.notification,
            data: {
                notifee: JSON.stringify({
                    body: notifiData.notification.body,
                    android: {
                        channelId: "default"
                    },
                    id: notifiData.id
                })
            }
        };
        firebase_config_1.firebaseAdmin.messaging().send(notificationData).then((resp) => {
            console.log(JSON.stringify(resp));
            return resp;
        })
            .catch((error) => {
            console.log('error', error);
        });
        // await firebaseAdmin.messaging().sendMulticast(notification_options)
        //   .then( (resp:any) => {
        // 	console.log(resp)
        //     return resp	;
        //   })
        //   .catch( (error:any) => {
        // 	  console.log(error);
        //   });
    }
    catch (error) {
        console.log(error);
    }
});
