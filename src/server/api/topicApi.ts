import TopicService, { CreateRequest } from "../services/topicService";
import { Request, Response } from "express";
import UserService from "../services/userService";

const topicService = new TopicService();
const userService = new UserService();

export default class TopicApi {

    static create = async (request: Request, response: Response) => {
        try {

            // TODO временно, пока у нас нет юзера на сервере
            // также здесь и в подобных местах нужно вкрутить проверку, что переданный в запросе юзер соответствует
            // тому, который залогинился
            const userId = (request.body as CreateRequest).userId;
            await userService.ensureUser({ id: userId, name: `testuser_${userId}` });

            response.send(await topicService.create(request.body));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot create topic" });
        }
    };

    static request = async (request: Request, response: Response) => {
        try {
            response.send(await topicService.request(request.query));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot get topics" });
        }
    };

}
