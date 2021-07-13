import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "./models/user";
import { Topic } from "./models/forum/topic";
import { Comment } from "./models/forum/comment";
import { CommentEmoji } from "./models/forum/commentEmoji";
import { Emoji } from "./models/forum/emoji";
import { UserTheme } from "./models/theme/userTheme";
import { SiteTheme } from "./models/theme/siteTheme";
import { config as dotEnvConfig } from "dotenv";


dotEnvConfig();

const sequelizeOptions: SequelizeOptions = {
    // database: "fargo-cards",
    models: [
        User,
        Topic,
        Comment,
        CommentEmoji,
        Emoji,
        UserTheme,
        SiteTheme,
    ],
    dialect: "postgres",
    repositoryMode: true,
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

if (!process.env.DATABASE_URL) {
    throw new Error("Database connection uri not found");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);


export const initDatabaseValues = async () => {
    const emojiRepository = sequelize.getRepository(Emoji);
    const themeRepository = sequelize.getRepository(SiteTheme);


    if ((await emojiRepository.findAll()).length === 0) {
        emojiRepository.create({ iconName: "fire-solid.svg" });
        emojiRepository.create({ iconName: "poop-solid.svg" });
    }

    if ((await themeRepository.findAll()).length === 0) {
        themeRepository.create({ theme: "STARS", description: "star theme" });
        themeRepository.create({ theme: "BASIC", description: "basic white theme" });
    }
};

export default sequelize;
