import { RequestHandler, Router } from "express";
import { pagesAuthMiddleware } from "../middlewares/serverAuthMiddlewares";
import serverRenderMiddleware from "../middlewares/serverRenderMiddleware";
import { stopSpamMiddleware } from "../middlewares/stopSpamMiddleware";

const isDev = process.env.NODE_ENV === "development";
const isHttps = process.env.HTTP_PROTOCOL === "https";

const commonAppMiddlewares = [
    isDev && stopSpamMiddleware, // это защита от расширений, типа Node Inspector Manager (NIM)
    !(isDev && !isHttps) && pagesAuthMiddleware,
    serverRenderMiddleware
].filter(Boolean) as Array<RequestHandler>;

export const appRoutes = (router: Router) => {
    router.use("/*", commonAppMiddlewares);
};
