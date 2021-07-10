require('dotenv').config({ path: `./dev.env` })

const clientConfig = require("./webpack/client.config.js");
const serverConfig = require("./webpack/server.config.js");

module.exports = [ clientConfig, serverConfig ];
