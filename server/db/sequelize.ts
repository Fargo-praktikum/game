import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "./models/user";
import { UserTheme } from "./models/theme/userTheme";
import { SiteTheme } from "./models/theme/siteTheme";
import { Emoji } from "./models/forum/emoji";

const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "newPassword",
    database: "fargo-cards",
    models: [
        User,
        UserTheme,
        SiteTheme,
    ],
    dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
    repositoryMode: true
};

const sequelize = new Sequelize(sequelizeOptions);

export const initEmoji = async () => {
    const emojiRepository = sequelize.getRepository(Emoji);

    if ((await emojiRepository.findAll()).length === 0) {
        emojiRepository.create({ iconName: "fire-solid.svg" });
        emojiRepository.create({ iconName: "poop-solid.svg" });
    }
};

export default sequelize;
