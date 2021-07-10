import { Emoji } from "../db/models/forum/emoji";
import sequelize from "../db/sequelize";
import RestServiceBase from "./restServiceBase";

export default class EmojiService extends RestServiceBase<Emoji> {

    private readonly _repository = sequelize.getRepository(Emoji);

    request = () => {
        return this._repository.findAll();
    };

    create = undefined;
    update = undefined;
    delete = undefined;
    find = undefined;
}
