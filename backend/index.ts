import Server from './classes/Server';
import Config from './types/Config';

// Use require here so that we can type the config object
const config: Config = require('../config.json');

const server = new Server(config);

export default server;
