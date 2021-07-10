import { server } from "./server";
import { startApp } from "./helpers/startApp";
import sequelize, { initEmoji } from "./db/sequelize";

(async function() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        //TODO хочешь полность пересоздать БД - расскомменти, а другую закомменти
        sequelize.sync({ force: true }).then(() => {
        // sequelize.sync().then(() => {

            initEmoji().then(() => {
                console.log("synced");
            });

        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    startApp({ server });

})();


