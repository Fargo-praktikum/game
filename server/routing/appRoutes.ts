import { Router } from "express";
import { pagesAuthMiddleware } from "../middlewares/serverAuthMiddleware";
import { serverForumPreloadDataMiddleware } from "../middlewares/serverForumPreloadDataMiddleware";
import serverRenderMiddleware from "../middlewares/serverRenderMiddleware";

export const appRoutes = (router: Router): void => {
    router.get("/forum/:topicId(\\d+)", pagesAuthMiddleware, serverForumPreloadDataMiddleware, serverRenderMiddleware);
    router.get("/forum", pagesAuthMiddleware, serverForumPreloadDataMiddleware, serverRenderMiddleware);
    router.use("/*", pagesAuthMiddleware, serverRenderMiddleware);
};
