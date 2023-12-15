"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronUtil = void 0;
const cron_1 = require("cron");
const logger_util_1 = require("./logger.util");
class CronUtil {
    start() {
        this.$dailyJob = new cron_1.CronJob('* * * 0 0 0', () => {
            logger_util_1.Console.info('Execute Job');
        }, () => {
            logger_util_1.Console.info('Job Completed');
        });
    }
    stop() {
        this.$dailyJob.stop();
    }
}
exports.cronUtil = new CronUtil();
