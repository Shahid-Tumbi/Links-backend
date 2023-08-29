import { CronJob } from 'cron';
import { Console } from './logger.util';

class CronUtil {
	private $dailyJob?: CronJob;
	start() {
		this.$dailyJob = new CronJob('* * * 0 0 0', () => {
			Console.info('Execute Job');
		}, () => {
			Console.info('Job Completed');
		});
	}
	stop() {
		this.$dailyJob.stop();
	}
}

export const cronUtil = new CronUtil();
