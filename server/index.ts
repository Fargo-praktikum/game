import { server } from "./server";
import { startApp } from "./helpers/startApp";
import sequelize, { initEmoji } from "./db/sequelize";

let retries = 5;

const tryToConnectToDB = async () => {
    while (retries) {
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");

            //TODO хочешь полность пересоздать БД - расскомменти, а другую закомменти
            await sequelize.sync({ force: true });
            // sequelize.sync();

            await initEmoji();
            console.log("initEmoji success");

            console.log("starting SSR SERVER!!!!!!!!!!");
            startApp({ server });

            break;
        } catch (e) {
            console.log(e);
            --retries;
            console.log(`retries left ${retries}`);
            await new Promise(res => setTimeout(res, 1000));
        }

    }
};

tryToConnectToDB()
    .then(() => {
        if (!retries) startApp({ server });
    });
