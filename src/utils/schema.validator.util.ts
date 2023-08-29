// tslint:disable-next-line: no-var-requires
const revalidator = require('revalidator');

export const schemaValidator = (schema: any) => {
	return (value: any) => {
		const results = revalidator.validate(value, schema);
		if (!results.valid) { throw new Error(JSON.stringify(results.errors)); }
	};
};
