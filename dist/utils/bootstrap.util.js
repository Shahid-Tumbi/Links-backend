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
exports.Bootstrap = void 0;
// import { DAO } from '../database';
require("../app/api/api.model");
// import { Console } from './logger.util';
// import { sqlDao } from '../database/index';
/**
 * @author Shahid Tumbi
 * @description A utility class to perform bootstrap operations before initializing app.
 */
class Bootstrap {
    /**
     * @author Shahid Tumbi
     * @description A static function to initialize the bootstrap process
     */
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Console.info('Bootstrapping App');
            // /**
            //  * Note Do not play with following part until and unless you have some idea about APP
            //  * Better to ask Administrator
            //  */
            // await AdminModel.findOneAndUpdate({ email: "superadmin@gmail.com" }, {
            // 	"name": "Super Admin",
            // 	"email": "superadmin@gmail.com",
            // 	"password": "Admin@@321"
            // }, { upsert: true });
            // const admin = await AdminModel.find();
            // Console.info(admin);
        });
    }
}
exports.Bootstrap = Bootstrap;
