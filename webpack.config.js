process.env.PUBLIC_URL = "https://local.ya-praktikum.tech:5000";

const clientConfig = require("./webpack/client.config.js");
const serverConfig = require("./webpack/server.config.js");

module.exports = [ clientConfig, serverConfig ];
