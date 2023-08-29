import { App } from "@app/app.interface";
import { workerData, parentPort } from 'worker_threads';
class ContactUtil {
	constructor() {
		parentPort.postMessage(this.merge(workerData));
	}
	merge(data: App.ContactData) {
		const phoneStatus = new Map<string, boolean>();
		const emailStatus = new Map<string, boolean>();
		let phones = '';
		let emails = '';
		let values: string = ``;
		data.phone_numbers.forEach(p => {
			if (p && !phoneStatus.has(p)) {
				phoneStatus.set(p, true);
				const s = phones === '' ? '(' : ', ';
				phones += `${s}'${p}'`;
				if (values) {
					values += ', '
				}
				values += `(uuid_generate_v1(), '${p}', '', contact_user('${p}', true), $u, $d, $t, $t)`;
			}
		});
		data.emails.forEach(e => {
			if (e && !emailStatus.has(e)) {
				emailStatus.set(e, true);
				const s = emails === '' ? '(' : ', ';
				emails += `${s}'${e}'`;
				if (values) {
					values += ', '
				}
				values += `(uuid_generate_v1(), '', '${e}', contact_user('${e}', false), $u, $d, $t, $t)`;
			}
		});
		if (phones) {
			phones += ')';
		}
		if (emails) {
			emails += ')';
		}
		return { phones, emails, values };
	}
}

export const contactUtil = new ContactUtil();
