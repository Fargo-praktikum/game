import TopicService from "../services/topicService";
import { Request, Response } from "express";

const topicService = new TopicService();

export default class TopicApi {

    static create = async (request: Request, response: Response) => {
        try {
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
