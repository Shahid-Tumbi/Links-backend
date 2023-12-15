"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const path_1 = require("path");
const logger_util_1 = require("./logger.util");
const fs_1 = require("fs");
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
/**
 * @description A utility function to load environment config variables.
 * @param {string} env name of environment config file inside the environments directory.
 */
exports.environment = ((env) => {
    logger_util_1.Console.info('Environment Configuration Started : ' + env);
    const envPath = (0, path_1.join)(process.cwd(), 'environments', `${env}.json`);
    try {
        const configData = (0, fs_1.readFileSync)(envPath, {
            encoding: 'UTF-8',
        });
        const config = JSON.parse(configData);
        Object.defineProperty(config, 'isLocal', {
            get() {
                return config.name === 'local';
            },
        });
        Object.defineProperty(config, 'isDev', {
            get() {
                return config.name === 'development';
            },
        });
        return config;
    }
    catch (err) {
        logger_util_1.Console.error('>> Environment Load Error');
        logger_util_1.Console.error(err.message);
        process.exit(0);
    }
})(process.env.NODE_ENV);
