import { Router } from "express";
import TopicApi from "../api/topicApi";

export const topicRoutes = (router: Router) => {

    const topicRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    topicRoute
        .post("/", [], TopicApi.create)
        .get("/", [], TopicApi.request);

    router.use("/api/topics", topicRoute);
};
