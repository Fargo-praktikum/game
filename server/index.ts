import { server } from "./server";
import { startApp } from "./helpers/startApp";
import sequalize, { initEmoji } from "./db/sequalize";

(async function() {
    try {
        await sequalize.authenticate();
        console.log("Connection has been established successfully_test.");

        //TODO хочешь полность пересоздать БД - расскомменти, а другую закомменти
        //sequalize.sync({ force: true }).then(() => {
        sequalize.sync().then(() => {

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


