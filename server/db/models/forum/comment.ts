import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user";
import { CommentEmoji } from "./commentEmoji";
import { Emoji } from "./emoji";
import { Topic } from "./topic";

interface CommentCreationAttrs {
    content: string;
    userId: number;
    topicId: number;
    parentId: number | null;
}

@Table({
    paranoid: true,
    tableName: "comments"
})
export class Comment extends Model<Comment, CommentCreationAttrs> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    content!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Topic)
    @AllowNull(false)
    @Column
    topicId!: number;

    @BelongsTo(() => Topic)
    topic!: Topic;

    @ForeignKey(() => Comment)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    parentId!: number | null;

    @BelongsTo(() => Comment)
    parentComment?: Comment | null;

    @HasMany(() => Comment)
    comments!: Comment[];

    @BelongsToMany(() => Emoji, () => CommentEmoji)
    emojies!: Emoji[];
}
