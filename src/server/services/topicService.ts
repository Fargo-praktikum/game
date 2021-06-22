import { Topic } from "../../db/models/forum/topic";
import { User } from "../../db/models/user";
import sequelize from "../../db/sequalize";
import RestServiceBase from "./restServiceBase";

interface CreateRequest {
    title: string;
    message: string;
    userId: number;
}

interface QueryRequest {
    offset?: number;
    limit?: number;
}

export default class TopicService extends RestServiceBase<Topic> {

    private readonly _repository = sequelize.getRepository(Topic);
    private readonly  _userRepository = sequelize.getRepository(User);

    create = (data: CreateRequest) => {
        return this._repository.create(data);
    };

    request = (data: QueryRequest) => {

        // if (data.offset === undefined || data.limit === undefined) {
        //     return this._repository.findAll({
        //         include: [
        //             this._userRepository
        //         ]
        //     });
        // }
        // else {
        return this._repository.findAndCountAll({
            include: [
                this._userRepository
            ],
            limit: data.limit,
            offset: data.offset
        });
        //}
    };

    update? = undefined;
    delete? = undefined;
    find? = undefined;
}
