const { app } = require("./serverDist/server.js");

const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === "development";

//!!! нужно тут сделать запуск!!!
// (async function() {
//     await sequelize.sync({force: true});
//     server.listen(...);
// })();

app.listen(port, () => {
    console.log("Application is started on localhost:", port);
});
