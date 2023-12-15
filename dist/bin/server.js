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
const http_1 = require("http");
const Debug = require("debug");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const mongoose_1 = require("mongoose");
// import { mailer } from '../utils/mailer.util';
const env_util_1 = require("../utils/env.util");
const bootstrap_util_1 = require("../utils/bootstrap.util");
const logger_util_1 = require("../utils/logger.util");
const swagger = require("swagger-express-ts");
require("../swaggermodels");
const app_routes_1 = require("../app/app.routes");
const debug = Debug('links:server');
/**
 * @author Shahid Tumbi
 * @description A class to handle initialization of server
 */
class Application {
    /**
     * @author Shahid Tumbi
     * @class Application
     * @description A function to create http server and attach application instance to it.
     */
    static init() {
        const app = new Application();
        const server = new http_1.Server(app.instance);
        // const socketMain = new SocketMain(server);
        // initGlobals({ io: socketMain.io });
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            debug('Listening on ' + bind);
        });
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof app.port === 'string' ? 'Pipe ' + app.port : 'Port ' + app.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    logger_util_1.Console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                // break;
                case 'EADDRINUSE':
                    logger_util_1.Console.error(bind + ' is already in use');
                    process.exit(1);
                // break;
                default:
                    throw error;
            }
        });
        app.load().then(() => {
            server.listen(app.port, () => {
                logger_util_1.Console.info(`Server Listening on port <${app.port}>`);
            });
        }).catch((error) => {
            logger_util_1.Console.info(Object.keys(error));
            logger_util_1.Console.error(error.message || 'App Loading failed');
            process.exit(1);
        });
    }
    get port() {
        return this.instance.get('port');
    }
    constructor() {
        /**
         * @class Application
         * @description A instance of express application
         */
        this.instance = express();
        this.instance.set('port', this.normalizePort());
    }
    /**
     * @description Normalize a port into a number, string, or false.
     */
    normalizePort() {
        const port = parseInt(env_util_1.environment.port, 10);
        if (isNaN(port)) {
            // named pipe
            return env_util_1.environment.port;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initConfig();
            yield Promise.all([
                // mailer.init(),
                this.initDatabase(),
                bootstrap_util_1.Bootstrap.init(),
            ]);
            this.logger();
            this.instance.use(app_routes_1.default);
            // render app if no route matched
            this.instance.use((req, res) => {
                res.render('templates/api');
            });
        });
    }
    logger() {
        this.instance.use((req, res, next) => {
            res.locals.startTime = Date.now();
            logger_util_1.Console.info('--------------------------------request Details----------------------------------------');
            logger_util_1.Console.info(req.originalUrl, { message: ' ' });
            logger_util_1.Console.info('Req Type ', { message: req.method });
            logger_util_1.Console.info('Req IP ', { message: req.connection.remoteAddress });
            logger_util_1.Console.info('auth-token ', { message: req.headers['auth-token'] });
            logger_util_1.Console.info('authorization ', { message: req.headers.authorization });
            logger_util_1.Console.info('user-agent ', { message: req.headers['user-agent'] });
            logger_util_1.Console.info('Host ', { message: req.headers.host });
            if (process.env.NODE_ENV !== 'production') {
                logger_util_1.Console.info('Req Body stringigy ', { message: JSON.stringify(req.body) });
                logger_util_1.Console.info('Req Params ', { message: JSON.stringify(req.params) });
                logger_util_1.Console.info('Req Query ', { message: JSON.stringify(req.query) });
                // Console.info('Req body ', { message: req.body });
            }
            logger_util_1.Console.info('Req Params ', { message: req.params });
            logger_util_1.Console.info('Req Query ', { message: req.query });
            logger_util_1.Console.info('-----------------------------------------ENDS------------------------------------------');
            next();
        });
    }
    /**
     * It is used to setup view engine for templates rendering.
     */
    initViewEngine() {
        this.instance.set('views', path.join(process.cwd(), 'public'));
        this.instance.engine('html', ejs.renderFile);
        this.instance.set('view engine', 'html');
    }
    /**
     * Initialize the database connection with MongoDB
     */
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, mongoose_1.set)('debug', true);
            const { uri, usr, pwd } = env_util_1.environment.mongodb;
            const options = {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            if (!env_util_1.environment.isLocal) {
                options.user = usr;
                options.pass = pwd;
            }
            logger_util_1.Console.info(options);
            (0, mongoose_1.connect)(uri, options).catch((err) => {
                logger_util_1.Console.error(err.message);
                process.exit(1);
            });
            logger_util_1.DbLogger.info(`Connecting Mongo Database`);
            yield new Promise(mongoose_1.connection.once.bind(mongoose_1.connection, 'open'));
            logger_util_1.DbLogger.info('Mongo Database Connected');
        });
    }
    /**
     * Initialize App Configurations for favicon, logger, cookie and body parser
     */
    initConfig() {
        this.initViewEngine();
        this.instance.use(express.static(path.join(process.cwd(), 'public')));
        // this.instance.use(favicon(path.join(process.cwd(), 'public/client', 'favicon.png')));
        this.instance.use(logger('dev'));
        this.instance.use(cookieParser());
        this.instance.use(cors());
        this.instance.use(bodyParser.json({ limit: "50mb" }));
        this.instance.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.instance.use('/api-docs/swagger', express.static('swagger'));
        this.instance.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        this.instance.use(swagger.express({
            definition: {
                info: {
                    title: 'Links',
                    version: '1.0',
                },
                basePath: '/v1',
                externalDocs: {
                    url: env_util_1.environment.url,
                },
                schemes: ['http', 'https'],
                securityDefinitions: {
                    // apiKeyHeader: {
                    // 	type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                    // 	in: SwaggerDefinitionConstant.Security.In.HEADER,
                    // 	name: 'Authorization',
                    // },
                    basicAuth: {
                        type: swagger.SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION,
                        in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
                        name: 'Authorization',
                    },
                    bearerAuth: {
                        type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
                        in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
                        name: 'Authorization',
                    },
                },
            },
        }));
    }
}
try {
    // Initialize Application
    Application.init();
}
catch (err) {
    // Handle application errors with friendly messages
    logger_util_1.Console.error(err.message);
}
