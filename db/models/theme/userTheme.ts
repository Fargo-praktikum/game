import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { User } from "../user";
import { SiteTheme } from "./siteTheme";

interface ThemeCreationAttrs {
    title: string;
    description: string;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "user_theme"
})
export class UserTheme extends Model<UserTheme, ThemeCreationAttrs> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => SiteTheme)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    themeId!: number;

    @Column(DataType.STRING)
    device!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: "owner_id"
    })
    ownerId!: string;
}
