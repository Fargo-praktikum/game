import { NextFunction, Request, Response } from "express";

export const stopSpamMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    console.log("зашел в stopSpamMiddleware");

    if (req.baseUrl === "/json") return;
    next();
};
