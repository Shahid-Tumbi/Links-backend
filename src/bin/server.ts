import { Server } from 'http';
import * as Debug from 'debug';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as ejs from 'ejs';
import * as cors from 'cors';
import { MongoError } from 'mongodb';
import { connect, connection, set, ConnectionOptions } from 'mongoose';
// import { mailer } from '@src/utils/mailer.util';
import { environment } from '@src/utils/env.util';
import { Bootstrap } from '@src/utils/bootstrap.util';
import { Console, DbLogger } from '@src/utils/logger.util';
import * as swagger from 'swagger-express-ts';
import '../swaggermodels';
import appRoutes from '@app/app.routes';
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
		const server = new Server(app.instance);
		// const socketMain = new SocketMain(server);
		// initGlobals({ io: socketMain.io });
		server.on('listening', () => {
			const addr = server.address();
			const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
			debug('Listening on ' + bind);
		});
		server.on('error', (error: any) => {
			if (error.syscall !== 'listen') {
				throw error;
			}
			const bind: any = typeof app.port === 'string' ? 'Pipe ' + app.port : 'Port ' + app.port;

			// handle specific listen errors with friendly messages
			switch (error.code) {
				case 'EACCES':
					Console.error(bind + ' requires elevated privileges');
					process.exit(1);
				// break;
				case 'EADDRINUSE':
					Console.error(bind + ' is already in use');
					process.exit(1);
				// break;
				default:
					throw error;
			}
		});
		app.load().then(() => {
			server.listen(app.port, () => {
				Console.info(`Server Listening on port <${app.port}>`);
			});
		}).catch((error) => {
			Console.info(Object.keys(error));
			Console.error(error.message || 'App Loading failed');
			process.exit(1);
		});
	}

	/**
	 * @class Application
	 * @description A instance of express application
	 */
	instance = express();
	get port() {
		return this.instance.get('port');
	}
	constructor() {
		this.instance.set('port', this.normalizePort());
	}
	/**
	 * @description Normalize a port into a number, string, or false.
	 */
	normalizePort() {
		const port: number = parseInt(environment.port, 10);

		if (isNaN(port)) {
			// named pipe
			return environment.port;
		}

		if (port >= 0) {
			// port number
			return port;
		}
		return false;
	}
	async load() {
		this.initConfig();
		await Promise.all([
			// mailer.init(),
			this.initDatabase(),
			Bootstrap.init(),
		]);
		this.logger();
		this.instance.use(appRoutes);
		// render app if no route matched
		this.instance.use((req: express.Request, res: express.Response) => {
			res.render('templates/api');
		});
	}

	private logger(): void {
		this.instance.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.locals.startTime = Date.now();
			Console.info('--------------------------------request Details----------------------------------------');
			Console.info(req.originalUrl, { message: ' ' });
			Console.info('Req Type ', { message: req.method });
			Console.info('Req IP ', { message: req.connection.remoteAddress });
			Console.info('auth-token ', { message: req.headers['auth-token'] });
			Console.info('authorization ', { message: req.headers.authorization });
			Console.info('user-agent ', { message: req.headers['user-agent'] });
			Console.info('Host ', { message: req.headers.host });
			if (process.env.NODE_ENV !== 'production') {
				Console.info('Req Body stringigy ', { message: JSON.stringify(req.body) });
				Console.info('Req Params ', { message: JSON.stringify(req.params) });
				Console.info('Req Query ', { message: JSON.stringify(req.query) });
				// Console.info('Req body ', { message: req.body });
			}
			Console.info('Req Params ', { message: req.params });
			Console.info('Req Query ', { message: req.query });
			Console.info('-----------------------------------------ENDS------------------------------------------');
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
	async initDatabase(): Promise<void> {
		set('debug', true);
		const { uri, usr, pwd } = environment.mongodb;
		const options: ConnectionOptions = {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		if (!environment.isLocal) {
			options.user = usr;
			options.pass = pwd;
		}
		Console.info(options);
		connect(uri, options).catch((err: MongoError) => {
			Console.error(err.message);
			process.exit(1);
		});
		DbLogger.info(`Connecting Mongo Database`);
		await new Promise(connection.once.bind(connection, 'open'));
		DbLogger.info('Mongo Database Connected');
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
		this.instance.use(swagger.express(
			{
				definition: {
					info: {
						title: 'Links',
						version: '1.0',
					},
					basePath: '/v1',
					externalDocs: {
						url: environment.url,
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
			},
		));
	}
}

try {
	// Initialize Application
	Application.init();
} catch (err) {
	// Handle application errors with friendly messages
	Console.error(err.message);
}