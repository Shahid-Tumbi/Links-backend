"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intlUtil = exports.IntlUtil = void 0;
class IntlUtil {
    // intl = Intl;
    constructor() {
        //
    }
    creator(pet) {
        return pet ? `your pet ${pet}'s` : 'your';
    }
    list(pets, self) {
        let msg = self ? 'you' : '';
        if (!pets || !pets.length) {
            return msg;
        }
        if (!!msg) {
            msg += ' and ';
        }
        msg += 'your';
        if (pets.length > 1) {
            const last = pets.pop();
            msg += ` pets ${pets.join(', ')} and ${last}`;
        }
        else {
            msg += ` pet ${pets}`;
        }
        return msg;
    }
}
exports.IntlUtil = IntlUtil;
exports.intlUtil = new IntlUtil();
