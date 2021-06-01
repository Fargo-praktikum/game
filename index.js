const { app } = require("./serverDist/server.js");

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log("Application is started on localhost:", port);
});
