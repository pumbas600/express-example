import express, { Express } from 'express';
import EventRouter from '../routes/EventRoutes';
import Config from '../types/Config';
import mongoose from 'mongoose';
import errorHandler from '../middleware/ErrorMiddleware';

export default class Server {
    private _app: Express;
    private config: Config;

    constructor(config: Config) {
        config.port = config.port ?? 5000;
        this.config = config;
        this._app = express();

        this._app.listen(this.config.port, () =>
            console.log(`Server started on port ${this.config.port}`),
        );

        this.init();
    }

    private init(): Server {
        // Make sure the db is connected before registering routers
        this.connectDB().then(() => this.configureApp());
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

    private configureApp() {
        // Allow express to access the body of requests
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));

        this._app.use('/api/events', EventRouter);
        console.log('Routers registered');

        this._app.use(errorHandler);
    }

    public get app(): Express {
        return this._app;
    }
}
