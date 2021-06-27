import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../user";
import { Comment } from "./comment";

interface TopicCreationAttrs {
    title: string;
    message: string;
    userId: number;
}

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "topics"
})
export class Topic extends Model<Topic, TopicCreationAttrs> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    message!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Comment)
    comments!: Comment[];
}
