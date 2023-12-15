"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
const swagger_express_ts_1 = require("swagger-express-ts");
const api_service_1 = require("./api.service");
let ApiController = class ApiController {
    config(req, res, next) {
        api_service_1.apiService
            .config(req, req.user)
            .then((result) => {
            res.success('Success', result);
        })
            .catch(next);
    }
};
ApiController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '',
        name: 'Global APIs',
    })
], ApiController);
exports.apiController = new ApiController();
