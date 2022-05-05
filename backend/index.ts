import Server from './Classes/Server';
import Config from './Types/Config';

// Use require here so that we can type the config object
const config: Config = require('../config.json');

const server = new Server(config);

export default server;
