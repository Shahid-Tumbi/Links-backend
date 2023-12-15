"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = exports.DbLogger = void 0;
const winston_1 = require("winston");
/**
 * @author Shahid Tumbi
 * @description A database logger which logs in console and log file (database.log).
 */
exports.DbLogger = (0, winston_1.createLogger)({
    level: 'info',
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({
                level: true,
                message: true,
            }), winston_1.format.printf((info) => {
                return `[${info.level}] ${info.message}`;
            })),
        }),
        new winston_1.transports.File({
            filename: 'database.log',
            format: winston_1.format.printf((info) => {
                return JSON.stringify(info);
            }),
        }),
    ],
});
/**
 * @author Shahid Tumbi
 * @description A console logger which logs in console with formated text.
 */
exports.Console = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({
                level: true,
                message: true,
            }), winston_1.format.printf((info) => {
                return `<${info.level}> ${info.message}`;
            })),
            level: '',
        }),
    ],
});
