import { Router } from "express";
import { pagesAuthMiddleware } from "../middlewares/serverAuthMiddleware";
import serverRenderMiddleware from "../middlewares/serverRenderMiddleware";

export const appRoutes = (router: Router): void => {
    router.use("/*", pagesAuthMiddleware, serverRenderMiddleware);
};
