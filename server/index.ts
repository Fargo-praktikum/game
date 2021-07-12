import { server } from "./server";
import { startApp } from "./helpers/startApp";
import sequelize, { initDatabaseValues } from "./db/sequelize";

(async function() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        sequelize.sync().then(() => {

            initDatabaseValues().then(() => {
                console.log("synced");
            });

        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    startApp({ server });

})();


