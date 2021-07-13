import Comment from "../models/forum/comment";
import CommentCreateRequest from "../models/forum/commentCreateRequest";
import Emoji from "../models/forum/emoji";
import Topic from "../models/forum/topic";
import TopicCreateRequest from "../models/forum/topicCreateRequest";
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

interface TopicListResponse {
    count: number;
    rows: TopicResponse[];
}

export interface TopicList {
    total: number;
    topics: Topic[];
}

interface CommentResponse {
    id: number;
    content: string;
    topicId: number;
    user: UserResponse;
    parentId: number | null;
    createdAt: string;
    emojies: [{
        id: number;
        iconName: "string",
        commentEmoji: {
            count: number;
        }
     }]
}

export const topicListAdapter = (topicListReponse: TopicListResponse): TopicList => {
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

export const commentAdapter = (commentResponse: CommentResponse): Comment => {

    const emojies: Record<number, number> = {};
    commentResponse.emojies.forEach((emoji) => {
        emojies[emoji.id] = emoji.commentEmoji.count;
    });

    const comment: Comment = {
        id: commentResponse.id,
        content: commentResponse.content,
        topicId: commentResponse.topicId,
        user: userAdapter(commentResponse.user),
        parentId: commentResponse.parentId,
        createdAt: new Date(Date.parse(commentResponse.createdAt)),
        emojies: emojies
    };

    return comment;
};

export default class ForumAPI extends BaseApi {
    constructor() {
        super(true);
    }

    // TODO если понадобится пагинация: передать параметры offset и limit
    async getTopics(): Promise<TopicList> {
        try {
            const data = await this._http.get<TopicList>(
                "/topics",
                {
                    responseTransformer: topicListAdapter
                }
            );

            return data;
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async createTopic(data: TopicCreateRequest): Promise<Topic> {
        try {
            return await this._http.post<Topic>(
                "/topics",
                {
                    data: data,
                    responseTransformer: topicAdapter
                }
            );
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async getComments(topicId: number): Promise<Comment[]> {
        try {
            const data = await this._http.get<Comment[]>(
                "/comments",
                {
                    data: { topicId },
                    responseTransformer: commentAdapter
                }
            );

            return data;
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async getEmojies(): Promise<Emoji[]> {
        try {
            return await this._http.get<Emoji[]>("/emojies");
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async addCommentEmoji(commentId: number, emojiId: number): Promise<void> {
        try {
            return await this._http.post(
                `/comments/${commentId}/add-emoji`,
                {
                    data: { emojiId }
                }
            );
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async createComment(data: CommentCreateRequest): Promise<Comment> {
        try {
            return await this._http.post<Comment>(
                "/comments",
                {
                    data: data,
                    responseTransformer: commentAdapter
                }
            );
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    protected _processApiErrorTexts(apiErrorReason: string): string | null {
        switch (apiErrorReason.toLowerCase()) {
            case "cannot create topic":
                return "Не удалось создать топик";
            case "cannot get topics":
                return "Не удалось получить список топиков";
            case "cannot get comments":
                return "Не удалось получить комментарии";
            case "cannot get emojies":
                return "Не удалось получить эмоции";
            case "cannot add emoji":
                return "Не удалось добавить эмоцию";
            case "Cannot create comment":
                return "Не удалось создать комментарий";
            default:
                return null;
        }
    }
}
