import { Comment } from "../db/models/forum/comment";
import { CommentEmoji } from "../db/models/forum/commentEmoji";
import { Emoji } from "../db/models/forum/emoji";
import { User } from "../db/models/user";
import sequalize from "../db/sequalize";
import RestServiceBase from "./restServiceBase";

export interface CreateRequest {
    content: string;
    userId: number;
    topicId: number;
    parentId: number | null;
}

export default class CommentService extends RestServiceBase<Comment> {

    private readonly _repository = sequalize.getRepository(Comment);
    private readonly _userRepository = sequalize.getRepository(User);
    private readonly _emojiRepository = sequalize.getRepository(Emoji);
    private readonly _commentEmojiRepository = sequalize.getRepository(CommentEmoji);

    request = (topicId: number) => {
        return this._repository
            .findAll({
                where: {
                    topicId
                },
                include: [
                    this._userRepository,
                    this._emojiRepository
                ]
            });
    };

    //TODO да, знаю, похожий код в Topic, можно было сделать универсально
    create = async (data: CreateRequest): Promise<Comment> => {

        const { id } = await this._repository.create(data);

        const newComment = await this._repository.findByPk(
            id,
            {
                include: [
                    this._userRepository,
                    this._emojiRepository
                ]
            }
        );

        if (!newComment) {
            throw new Error();
        }

        return newComment;
    };

    addEmoji = async (commentId: number, emojiId: number) => {
        const commentEmoji = await this._commentEmojiRepository
            .findOne({
                where: {
                    commentId,
                    emojiId
                }
            });

        if (commentEmoji) {
            this._commentEmojiRepository.update(
                { count: commentEmoji.count + 1 },
                {
                    where: {
                        commentId,
                        emojiId
                    }
                }
            );
        }
        else {
            this._commentEmojiRepository.create({ commentId, emojiId, count: 1 });
        }
    };

    update? = undefined;
    delete? = undefined;
    find? = undefined;
}
