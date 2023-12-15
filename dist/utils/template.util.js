"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateUtil = exports.getDeepLink = void 0;
const path = require("path");
const handlebars = require("handlebars");
const getDeepLink = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield (new TemplateUtil(path.join(__dirname + '../../../views/deeplink.html'))).compileFile(option);
    return (content);
});
exports.getDeepLink = getDeepLink;
/**
 * @description this is used to handle bars to resolve the html from ejs format.
 */
class TemplateUtil {
    constructor(template) {
        this.fs = require('fs');
        this.template = template;
    }
    compileFile(complieData) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(this.template, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                try {
                    const template = handlebars.compile(content, { noEscape: true });
                    const html = template(complieData);
                    resolve(html);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.TemplateUtil = TemplateUtil;
