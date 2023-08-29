
// import { DAO } from '@src/database';
import '@api/api.model';
import { AdminModel } from '@src/app/api/admin';
import { Console } from './logger.util';
// import { sqlDao } from '@database/index';

/**
 * @author Shahid Tumbi
 * @description A utility class to perform bootstrap operations before initializing app.
 */
export class Bootstrap {
	/**
	 * @author Shahid Tumbi
	 * @description A static function to initialize the bootstrap process
	 */
	static async init() {
		Console.info('Bootstrapping App');
		/**
		 * Note Do not play with following part until and unless you have some idea about APP
		 * Better to ask Administrator
		 */
		await AdminModel.findOneAndUpdate({ email: "superadmin@gmail.com" }, {
			"name": "Super Admin",
			"email": "superadmin@gmail.com",
			"password": "Admin@@321"
		}, { upsert: true });

		const admin = await AdminModel.find();
		Console.info(admin);
	}
	// async bootstrapCounters() {
	// 	let userCounter = 0;
	// 	if (lastUser) {
	// 		const userId = lastUser.uniqueId || 'USR0';
	// 		userCounter = parseInt(userId.substr(3), 10);
	// 	}
	// 	global.counters = {
	// 		user: userCounter,
	// 	};
	// }
}