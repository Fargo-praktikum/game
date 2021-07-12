require('dotenv').config({ path: `./${process.env.NODE_ENV}.env` })

const clientConfig = require("./webpack/client.config.js");
const serverConfig = require("./webpack/server.config.js");

module.exports = [ clientConfig, serverConfig ];
