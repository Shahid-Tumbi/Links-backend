"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
const constants_1 = require("../app/constants");
/**
 * @author Shahid Tumbi
 * @description A utility class for response errors which inherit native error class to provide stack trace in app.
 * @argument status A status code to send back to client when error occur
 * @argument message A error message to send back to client when error occur
 * @argument errorCode A special optional error code to identifiy the error cause
 */
class ResponseError extends Error {
    constructor(status, messages, errorCode) {
        super(messages[constants_1.LangCode.English] || messages);
        this.status = status;
        this.messages = messages;
        this.errorCode = errorCode;
        this.name = 'ResponseError';
    }
}
exports.ResponseError = ResponseError;
