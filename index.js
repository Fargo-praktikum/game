const { app } = require("./serverDist/server.js");
const https = require("https");
const selfSigned = require("openssl-self-signed-certificate");

const port = process.env.PORT || 443;
const isDev = process.env.NODE_ENV === "development";

if (isDev) {
    https
        .createServer({key: selfSigned.key, cert: selfSigned.cert}, app)
        .listen(port, '0.0.0.0', () => {
            console.info(`https://localhost:${port}`);
        });
}
else {
    app.listen(port, () => {
        console.log("Application is started on localhost:", port);
    });
}
