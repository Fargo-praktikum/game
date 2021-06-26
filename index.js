const { exportVars } = require("./serverDist/server.js");

const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === "development";

const sequalize = exportVars.sequalize;
const app = exportVars.app;
const initEmoji = exportVars.initEmoji;

(async function() {
    try {
        await sequalize.authenticate();
        console.log("Connection has been established successfully.");

        //TODO хочешь полность пересоздать БД - расскомменти, а другую закомменти
        //sequelize.sync({ force: true }).then(() => {
        sequalize.sync().then(() => {

            initEmoji().then(() => {
                console.log("synced");
            });

        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    app.listen(port, () => {
        console.log("Application is started on localhost:", port);
    });

})();
