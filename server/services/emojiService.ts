import { Emoji } from "../db/models/forum/emoji";
import sequalize from "../db/sequalize";
import RestServiceBase from "./restServiceBase";

export default class EmojiService extends RestServiceBase<Emoji> {

    private readonly _repository = sequalize.getRepository(Emoji);

    request = () => {
        return this._repository.findAll();
    };

    create = undefined;
    update = undefined;
    delete = undefined;
    find = undefined;
}
