"use strict";
// import request = require("request");
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsUtil = void 0;
const smsUtil = (phoneNumber, otpNumber) => {
    try {
        const SmsCred = {
            // AccountPhone = '+919016181332',
            Sid: '',
            authToken: '',
            messagingSid: ''
            // BaseUrl = 'https://api-app2.simpletexting.com/v2/api/messages'
        };
        const accountSid = SmsCred.Sid;
        const authToken = SmsCred.authToken;
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
            body: `Links: Your Security Code is ${otpNumber}. Please do not share with anyone.`,
            messagingServiceSid: SmsCred.messagingSid,
            to: `${phoneNumber}`
        })
            .then((message) => console.log('Message', message.sid))
            .catch((err) => console.log('err', err));
        //   'method': 'POST',
        //   'url': SmsCred.BaseUrl,
        //   'headers': {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Authorization': `Bearer ${SmsCred.ApiToken}`
        //   },
        //   body: JSON.stringify({
        //     "contactPhone": `${phoneNumber}`,
        //     "mode": "AUTO",
        //     "text": `Links: Your Security Code is ${otpNumber}. Please do not share with anyone.`,
        //     "accountPhone": SmsCred.AccountPhone
        //   })
        // };
        // request(options, function (error, response) {
        //   if (error) throw new Error(error);
        //   console.log(response.body);
        // });
    }
    catch (error) {
        return error;
    }
};
exports.smsUtil = smsUtil;
