import { RequestHandler, Router } from "express";
import { pagesAuthMiddleware } from "../middlewares/serverAuthMiddlewares";
import serverRenderMiddleware from "../middlewares/serverRenderMiddleware";

const isDev = process.env.NODE_ENV === "development";
const isHttps = process.env.HTTP_PROTOCOL === "https";

const commonAppMiddlewares = [
    !(isDev && !isHttps) && pagesAuthMiddleware,
    serverRenderMiddleware
].filter(Boolean) as Array<RequestHandler>;

export const appRoutes = (router: Router) => {
    router.use("/*", commonAppMiddlewares);
};
