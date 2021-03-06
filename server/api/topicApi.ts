import TopicService from "../services/topicService";
import { Request, Response } from "express";
import UserService from "../services/userService";
import { handleError } from "./utils/sendError";

const topicService = new TopicService();
const userService = new UserService();

export default class TopicApi {

    static create = async (request: Request, response: Response) => {
        try {

            const { id: userId, login } = response.locals["user"];
            await userService.ensureUser({ id: userId, name: login });

            response.send(await topicService.create({ ...request.body, userId }));
        }
        catch (e) {
            handleError(e, "Cannot create topic", response);
        }
    };

    static request = async (request: Request, response: Response) => {
        try {
            response.send(await topicService.request(request.query));
        }
        catch (e) {
            handleError(e, "Cannot get topics", response);
        }
    };

}
