"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const admin = require("firebase-admin");
const utils_1 = require("../utils");
exports.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(utils_1.environment.firebaseConfig)
});
