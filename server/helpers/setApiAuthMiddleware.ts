import { apiAuthMiddleware } from "../middlewares/serverAuthMiddlewares";
import { NextFunction, Request, RequestHandler, Response } from "express";


const isDev = process.env.NODE_ENV === "development";
const isHttps = process.env.HTTP_PROTOCOL === "https";


const temporaryWarning = (_req: Request, res: Response, _next: NextFunction) => {
    console.log("зашел в temporaryWarning");
    // по хорошему нужно для heroku добавить регистрацию в postgres с добавлением токена и его дальнейшим сравнением
    return res.status(403).send("Запрос временно недоступен на heroku (302)");
};


export const setApiAuthMiddleware = () => {
    console.log(`isDev from setApiAuthMiddleware = ${isDev}`);
    console.log(`isHttps from setApiAuthMiddleware = ${isHttps}`);

    const arrHandlers = [
        !(isDev && !isHttps) && apiAuthMiddleware,
        (isDev && !isHttps) && temporaryWarning,
    ].filter(Boolean) as Array<RequestHandler>;

    console.log("arrHandlers");
    console.log(arrHandlers);
    return arrHandlers;
};
