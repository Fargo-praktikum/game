import Topic from "../models/forum/topic";
import UserForumInfo from "../models/forum/userForumInfo";
import { BaseApi } from "./baseApi";

interface UserResponse {
    id: number;
    name: string;
}

interface TopicResponse {
    id: number;
    title: string;
    message: string;
    userId: number;
    user: UserResponse;
    createdAt: string;
}

interface TopicListReponse {
    count: number;
    rows: TopicResponse[];
}

interface TopicList {
    total: number;
    topics: Topic[];
}

const topicListAdapter = (topicListReponse: TopicListReponse): TopicList => {
    const res: TopicList = {
        total: topicListReponse.count,
        topics: topicListReponse.rows.map((topic) => {
            return topicAdapter(topic);
        })
    };

    return res;
};

const topicAdapter = (topicResponse: TopicResponse): Topic => {
    const topic: Topic = {
        id: topicResponse.id,
        title: topicResponse.title,
        message: topicResponse.message,
        user: userAdapter(topicResponse.user),
        createdAt: new Date(Date.parse(topicResponse.createdAt))
    };

    return topic;
};

const userAdapter = (userResponse: UserResponse): UserForumInfo => {
    const user: UserForumInfo = {
        id: userResponse.id,
        name: userResponse.name
    };

    return user;
};

export default class ForumAPI extends BaseApi {
    constructor() {
        super(true);
    }

    // TODO если понадобится пагинация: передать параметры offset и limit
    async getTopics(): Promise<TopicList> {
        const data = await this._http.get<TopicList>(
            "/topics",
            {
                responseTransformer: topicListAdapter
            }
        );

        return data;
    }

    protected _processApiErrorTexts(apiErrorReason: string): string | null {
        switch (apiErrorReason.toLowerCase()) {
            case "cannot create topic":
                return "Не удалось создать топик";
            case "cannot get topics":
                return "Не удалось получить список топиков";
            default:
                return null;
        }
    }
}
