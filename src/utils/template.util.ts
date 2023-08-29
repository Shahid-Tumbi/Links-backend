import * as path from 'path';
import * as handlebars from 'handlebars';

export const getDeepLink = async (option: any) => {
	const content = await (new TemplateUtil(path.join(__dirname + '../../../views/deeplink.html'))).compileFile(option);
	return (content);
};

/**
 * @description this is used to handle bars to resolve the html from ejs format.
 */
export class TemplateUtil {
	private fs = require('fs');
	private template: string;
	constructor(template: string) {
		this.template = template;
	}
	compileFile(complieData: object): Promise<string> {
		return new Promise((resolve, reject) => {
			this.fs.readFile(this.template, 'utf8', (err: Error, content: any) => {
				if (err) {
					reject(err);
				}
				try {
					const template = handlebars.compile(content, { noEscape: true });
					const html = template(complieData);
					resolve(html);
				} catch (err) {
					reject(err);
				}
			});
		});
	}
}
