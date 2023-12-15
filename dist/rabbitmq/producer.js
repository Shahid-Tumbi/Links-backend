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
exports.producer = void 0;
const amqp = require("amqplib");
function pushTask(data, queueName) {
    return __awaiter(this, void 0, void 0, function* () {
        const producerQueue = queueName;
        const msgBuffer = Buffer.from(JSON.stringify(data));
        try {
            const connection = yield amqp.connect("amqp://localhost:5672");
            const channel = yield connection.createChannel();
            yield channel.assertQueue(producerQueue, { durable: true });
            yield channel.sendToQueue(producerQueue, msgBuffer, { persistant: true });
            console.log("Sending message to queue");
            yield channel.close();
            yield connection.close();
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.producer = pushTask;
