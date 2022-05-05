import express, { Express } from 'express';
import EventRouter from '../Routes/EventRoutes';
import Config from '../Types/Config';
import mongoose from 'mongoose';

export default class Server {
	private _app: Express;

	constructor(config: Config) {
		const port = config.port ?? 5000;
		this._app = express();

		// Allow express to access the body of requests
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: false }));

		this._app.listen(port, () => console.log(`Server started on port ${port}`));

		mongoose
			.connect(config.mongoURI)
			.then(() => {
				this._app.use('/api/events', EventRouter);
				console.log('Routers registered');
			})
			.catch(console.log);
	}

	public get app(): Express {
		return this._app;
	}
}
