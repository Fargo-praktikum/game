import { Router } from "express";
import serverRenderMiddleware from "../serverRenderMiddleware";

export const appRoutes = (router: Router) => {
    // eslint-disable-next-line
    router.use("/*", serverRenderMiddleware);
};
