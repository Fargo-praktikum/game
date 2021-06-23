import { AutoIncrement, PrimaryKey, Table, Column, AllowNull, ForeignKey} from "sequelize-typescript";

const { Model, DataType } = require('sequelize-typescript');


@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme'
})
class UserTheme extends Model<UserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string;

    @Column(DataType.STRING)
    device: string;
}

UserTheme.init()

await UserTheme.sync({ force: true });
