import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "../db/models/user";
import { Comment } from "../db/models/forum/comment";
import { CommentEmoji } from "../db/models/forum/commentEmoji";
import { Emoji } from "../db/models/forum/emoji";
import { Topic } from "../db/models/forum/topic";

const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "newPassword",
    database: "fargo-cards",
    models: [
        User,
        Comment,
        CommentEmoji,
        Emoji,
        Topic
    ],
    dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
    repositoryMode: true
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
