import { AllowNull, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment";
import { Emoji } from "./emoji";

interface CommentEmojiCreationAttrs {
    commentId: number;
    emojiId: number;
    count: number;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "commentsemojies",
    modelName: "commentEmoji"
})
export class CommentEmoji extends Model<CommentEmoji, CommentEmojiCreationAttrs> {

    @ForeignKey(() => Comment)
    @AllowNull(false)
    @Column
    commentId!: number;

    @ForeignKey(() => Emoji)
    @AllowNull(false)
    @Column
    emojiId!: number;

    @AllowNull(false)
    @Column
    count!: number;
}
