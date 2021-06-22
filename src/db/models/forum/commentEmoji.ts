import { AllowNull, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment";
import { Emoji } from "./emoji";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "commentsemojies"
})
export class CommentEmoji extends Model<CommentEmoji> {

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
