const amqp = require("amqplib");
const {notificationUtil } = require('../utils/notification.util')
const consumerQueue = "notification"
async function taskConsume() {
 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue(consumerQueue,{durable:true});
   channel.consume(consumerQueue, async (payload: { content: { toString: () => string; }; }) => {
     const message = JSON.parse(payload.content.toString());
     await notificationUtil(message)
     console.log('Received ',message);
     channel.ack(payload);
   });
   console.log(`Waiting for messages...`);
 } catch (ex) {
   console.error(ex);
 }
}
export const consumer = taskConsume;