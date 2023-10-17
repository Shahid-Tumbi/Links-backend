import { UserDetailModel } from "@src/app/api/user";
import { QueueName } from "@src/app/api/user/user.constants";
import gptWorker from "@src/utils/gptworker.utl";

const amqp = require("amqplib");
const {notificationUtil } = require('../utils/notification.util')
async function taskConsume(queueName:string) {
  try {
   const consumerQueue = queueName;
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue(consumerQueue,{durable:true});
   channel.consume(consumerQueue, async (payload: { content: { toString: () => string; }; }) => {
     const message = JSON.parse(payload.content.toString());
     if(queueName == QueueName.notification ){
     await notificationUtil(message)
     }
     if(queueName == QueueName.follow){
       console.log('Received ',message);
       await  UserDetailModel.findOneAndUpdate(
        { userId: message.followerId.toString()},
        { $inc: { totalFollowings: 1} },) // Increment the totalFollowers field by 1
       await  UserDetailModel.findOneAndUpdate(
        { userId: message.followingId.toString()},
        { $inc: { totalFollowers: 1 } },) // Increment the totalFollowers field by 1
     }
     if(queueName == QueueName.unfollow){
      await  UserDetailModel.findOneAndUpdate(
        { userId: message.followerId.toString()},
        { $inc: { totalFollowings: -1} },)
        await  UserDetailModel.findOneAndUpdate(
          { userId: message.followingId.toString()},
          { $inc: { totalFollowers: -1 } },)
     }
     if(queueName == QueueName.gptprocess){
      await gptWorker(message)
     }
     channel.ack(payload);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
   throw new Error(ex)
 }
}
export const consumer = taskConsume;