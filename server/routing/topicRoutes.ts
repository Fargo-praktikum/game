import { Router } from "express";
import TopicApi from "../api/topicApi";
import { apiAuthMiddleware } from "../middlewares/serverAuthMiddlewares";

export const topicRoutes = (router: Router) => {

    const topicRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    topicRoute
        .post("/", [apiAuthMiddleware], TopicApi.create)
        .get("/", [apiAuthMiddleware], TopicApi.request);

    router.use("/api/topics", topicRoute);
};
