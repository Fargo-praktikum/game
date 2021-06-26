import { Topic } from "../../db/models/forum/topic";
import { User } from "../../db/models/user";
import sequalize from "../../db/sequalize";
import RestServiceBase from "./restServiceBase";

export interface CreateRequest {
    title: string;
    message: string;
    userId: number;
}

interface QueryRequest {
    offset?: number;
    limit?: number;
}

export default class TopicService extends RestServiceBase<Topic> {

    private readonly _repository = sequalize.getRepository(Topic);
    private readonly _userRepository = sequalize.getRepository(User);

    create = async (data: CreateRequest) => {
        const { id } = await this._repository.create(data);

        const newTopic = await this.find(id);

        if (!newTopic) {
            throw new Error();
        }

        return newTopic;
    };

    find = (id: number) => {
        return this._repository
            .findByPk(
                id,
                {
                    include: [
                        this._userRepository
                    ]
                }
            );
    };

    request = (data: QueryRequest) => {
        return this._repository.findAndCountAll({
            include: [
                this._userRepository
            ],
            limit: data.limit,
            offset: data.offset
        });
    };

    update? = undefined;
    delete? = undefined;
}
