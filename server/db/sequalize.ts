import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "./models/user";
import { Topic } from "./models/forum/topic";
import { Comment } from "./models/forum/comment";
import { CommentEmoji } from "./models/forum/commentEmoji";
import { Emoji } from "./models/forum/emoji";
import { UserTheme } from "./models/theme/userTheme";
import { SiteTheme } from "./models/theme/siteTheme";

const sequelizeOptions: SequelizeOptions = {
    host: process.env.NODE_ENV === "development" ? "localhost" : "postgres",
    port: 5432,
    username: "postgres",
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
    repositoryMode: true
};

const sequalize = new Sequelize(sequelizeOptions);

export const initEmoji = async () => {
    const emojiRepository = sequalize.getRepository(Emoji);

    if ((await emojiRepository.findAll()).length === 0) {
        emojiRepository.create({ iconName: "fire-solid.svg" });
        emojiRepository.create({ iconName: "poop-solid.svg" });
    }
};

export default sequalize;
