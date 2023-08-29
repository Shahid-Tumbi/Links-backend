import { App } from "@app/app.interface";
import { workerData, parentPort } from 'worker_threads';

class UsernameUtil {
	constructor() {
		parentPort.postMessage(this.generateUsernames(workerData));
	}
	generateUsernames(user: App.UsernameData) {
		const name_parts = user.name.split(' ');
		const LENGTH = { MIN: 5, MAX: 30 };
		const usernames = new Set<string>();
		const pairs: Array<string[]> = [[name_parts.map(a => a.charAt(0)).join('')]];
		if (name_parts[0].length > LENGTH.MAX) {
			pairs.push([name_parts[0].slice(0, LENGTH.MAX)]);
		} else {
			pairs.push([name_parts[0]]);
		}
		// create pairs to create usernames
		name_parts.forEach((n, i) => {
			if (!i) {
				return;
			}
			const p = name_parts[0];
			pairs.push([p, n], [p.charAt(0), n], [n, p], [n.charAt(0), p]);
		});
		{ // append numbers like current year, and phone number last digits 
			const currentYear = new Date().getFullYear() + '';
			const nums = [
				currentYear.slice(-2),
				currentYear,
			];
			if (user.phone_number) {
				nums.push(user.phone_number.slice(-4));
			}
			let randomCount = 2;
			while (randomCount > 0) {
				const num = this.randomNumbers(2);
				if (!nums.includes(num)) {
					randomCount--;
					nums.push(num);
				}
			}
			const l = pairs.length;
			for (let i = 0; i < l; i++) {
				nums.forEach((num) => {
					pairs.push([...pairs[i], num]);
				});
			}
			['', '_', '.'].forEach((splChar: string) => {
				pairs.forEach((pair: string[]) => {
					usernames.add(pair.join(splChar));
				});
			});
		}
		usernames.forEach((uname) => {
			if (uname.length < LENGTH.MIN || uname.length > LENGTH.MAX) {
				usernames.delete(uname);
			}
		});
		return [...usernames.values()];
	}
	randomNumbers(count: number = 2): string {
		return `${Math.random() * 1000}`.slice(0, count);
	}
}

export const usernameUtil = new UsernameUtil();
