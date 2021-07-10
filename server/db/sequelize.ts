import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "./models/user";
import { Topic } from "./models/forum/topic";
import { Comment } from "./models/forum/comment";
import { CommentEmoji } from "./models/forum/commentEmoji";
import { Emoji } from "./models/forum/emoji";
import { UserTheme } from "./models/theme/userTheme";
import { SiteTheme } from "./models/theme/siteTheme";

const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    port: 5432,
    username: "postgresUser",
    password: "newPassword",
    database: "fargo-cards",
    models: [
        User,
        Topic,
        Comment,
        CommentEmoji,
        Emoji,
        UserTheme,
        SiteTheme,
    ],
    dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
    repositoryMode: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
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
