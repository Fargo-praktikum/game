import { Request, Response } from "express";
import CommentService, { CreateRequest } from "../services/commentService";
import UserService from "../services/userService";

const commentService = new CommentService();
const userService = new UserService();

interface AddEmojiRequest {
    emojiId: number;
}

export default class CommentApi {

    static request = async (request: Request, response: Response) => {
        try {
            response.send(await commentService.request(Number((request.query as any).topicId)));
        }
        catch (e) {
            // TODO надо бы где-то сделать метод, в который это запихнуть
            console.log(e);
            response.status(500).send({ error: "Cannot get comments" });
        }
    };

    static addEmoji = async (request: Request, response: Response) => {
        try {

            await commentService.addEmoji(parseInt(request.params.commentId), (request.body as AddEmojiRequest).emojiId);

            response.status(200).send();
        }
        catch (e) {
            // TODO надо бы где-то сделать метод, в который это запихнуть
            console.log(e);
            response.status(500).send({ error: "Cannot add emoji" });
        }
    };

    static create = async (request: Request, response: Response) => {
        try {

            // TODO временно, пока у нас нет юзера на сервере
            // также здесь и в подобных местах нужно вкрутить проверку, что переданный в запросе юзер соответствует
            // тому, который залогинился
            const userId = (request.body as CreateRequest).userId;
            await userService.ensureUser({ id: userId, name: `testuser_${userId}` });

            response.send(await commentService.create(request.body));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot create comment" });
        }
    };
}
