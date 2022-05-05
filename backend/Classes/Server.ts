import express, { Express } from 'express';
import EventRouter from '../Routes/EventRoutes';
import Config from '../Types/Config';
import mongoose from 'mongoose';

export default class Server {
	private _app: Express;
	private config: Config;

	constructor(config: Config) {
		config.port = config.port ?? 5000;
		this.config = config;
		this._app = express();

		// Allow express to access the body of requests
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: false }));

		this._app.listen(this.config.port, () => console.log(`Server started on port ${this.config.port}`));

		this.init();
	}

	private init(): Server {
		// Make sure the db is connected before registering routers
		this.connectDB().then(() => this.registerRouters());
		return this;
	}

	private async connectDB() {
		try {
			const conn = await mongoose.connect(this.config.mongoURI);
			console.log(`MongoDB connected: ${conn.connection.host}`);
		} catch (e) {
			console.log(e);
			process.exit(1); // Stop the server with an error
		}
	}

	private registerRouters() {
		this._app.use('/api/events', EventRouter);
		console.log('Routers registered');
	}

	public get app(): Express {
		return this._app;
	}
}
