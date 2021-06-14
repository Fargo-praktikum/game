const { app } = require("./serverDist/server.js");

const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === "development";

app.listen(port, () => {
    console.log("Application is started on localhost:", port);
});
