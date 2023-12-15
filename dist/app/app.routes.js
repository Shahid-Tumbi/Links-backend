"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_routes_1 = require("./api/api.routes");
// create Router
const router = (0, express_1.Router)();
// router.get('/verify/:token', (req: ) => {})
// Use V1 Api Routes
router.use(api_routes_1.apiV1Routes.path, api_routes_1.apiV1Routes.router);
exports.default = router;
