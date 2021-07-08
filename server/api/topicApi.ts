import TopicService, { CreateRequest } from "../services/topicService";
import { Request, Response } from "express";
import UserService from "../services/userService";

const topicService = new TopicService();
const userService = new UserService();

export default class TopicApi {

    static create = async (request: Request, response: Response) => {
        try {

            const { id: userId, login } = response.locals["user"];

            // TODO тут проверяем, что переданный юзер совпадает с залогиненым
            // по идее, можно было бы избавиться от передачи юзера, т.к. он уже тут есть, но не сейчас
            if ((request.body as CreateRequest).userId !== parseInt(userId)) {
                response.status(401).send();
            }
            await userService.ensureUser({ id: userId, name: login });

            response.send(await topicService.create(request.body));
        }
        catch (e) {
            console.error(e);
            response.status(500).send({ error: "Cannot create topic", details: e });
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
