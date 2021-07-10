import { User, UserCreationAttrs } from "../db/models/user";
import sequelize from "../db/sequelize";
import RestServiceBase from "./restServiceBase";

export default class UserService extends RestServiceBase<User> {

    private readonly _repository = sequelize.getRepository(User);

    create = (data: UserCreationAttrs) => {
        return this._repository.create(data);
    };

    find = (id: number) => {
        return this._repository.findByPk(id);
    };

    ensureUser = async (data: UserCreationAttrs) => {
        let user = await this.find(data.id);

        if (!user) {
            user = await this.create(data);
        }

        return user;
    };

    request? = undefined;
    update? = undefined;
    delete? = undefined;
}
