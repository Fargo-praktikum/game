import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface UserCreationAttrs {
    id: number;
    name: string;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "users"
})
export class User extends Model<User, UserCreationAttrs> {

    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
}
