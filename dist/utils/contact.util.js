"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUtil = void 0;
const worker_threads_1 = require("worker_threads");
class ContactUtil {
    constructor() {
        worker_threads_1.parentPort.postMessage(this.merge(worker_threads_1.workerData));
    }
    merge(data) {
        const phoneStatus = new Map();
        const emailStatus = new Map();
        let phones = '';
        let emails = '';
        let values = ``;
        data.phone_numbers.forEach(p => {
            if (p && !phoneStatus.has(p)) {
                phoneStatus.set(p, true);
                const s = phones === '' ? '(' : ', ';
                phones += `${s}'${p}'`;
                if (values) {
                    values += ', ';
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
                    values += ', ';
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
exports.contactUtil = new ContactUtil();
