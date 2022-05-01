import express from 'express';
import EventRouter from './Routes/EventRoutes';
import Config from './Types/Config';

// Use require here so that we can type the config object
const config: Config = require('../config.json');

const port = config.port ?? 5000;
const app = express();

// Allow express to access the body of requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/events', EventRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
