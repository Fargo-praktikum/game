import { Router } from "express";
import TopicApi from "../api/topicApi";
import { setApiAuthMiddleware } from "../helpers/setApiAuthMiddleware";

export const topicRoutes = (router: Router) => {

    const topicRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    topicRoute
        .post("/", setApiAuthMiddleware(), TopicApi.create)
        .get("/", setApiAuthMiddleware(), TopicApi.request);

    router.use("/api/topics", topicRoute);
};
