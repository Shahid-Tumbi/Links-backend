
export class IntlUtil {
	// intl = Intl;
	constructor() {
		//
	}
	creator(pet?: string) {
		return pet ? `your pet ${pet}'s` : 'your';
	}
	list(pets: string[], self?: boolean): string {
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
		} else {
			msg += ` pet ${pets}`;
		}
		return msg;
	}
}

export const intlUtil = new IntlUtil();
