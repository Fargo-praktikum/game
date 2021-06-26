import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "emojies"
})
export class Emoji extends Model<Emoji, { iconName: string }> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    iconName!: string;
}
