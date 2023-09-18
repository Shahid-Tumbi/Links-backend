const amqp = require("amqplib");

async function pushTask(data: any,queueName:string) {
  const producerQueue = queueName
    console.log("data",JSON.stringify(data))
 const msgBuffer = Buffer.from(JSON.stringify(data));
 try {
   const connection = await amqp.connect("amqp://localhost:5672");
   const channel = await connection.createChannel();
   await channel.assertQueue(producerQueue,{ durable : true });
   await channel.sendToQueue(producerQueue, msgBuffer,{ persistant: true});
   console.log("Sending message to queue");
   await channel.close();
   await connection.close();
 } catch (ex) {
   console.error(ex);
 }
}
export const producer  = pushTask;