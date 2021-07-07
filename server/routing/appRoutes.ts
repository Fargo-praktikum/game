import { Router } from "express";
import { pagesAuthMiddleware } from "../middlewares/serverAuthMiddleware";
import serverRenderMiddleware from "../middlewares/serverRenderMiddleware";

export const appRoutes = (router: Router) => {
    // eslint-disable-next-line
    router.use("/*", pagesAuthMiddleware, serverRenderMiddleware);
};
