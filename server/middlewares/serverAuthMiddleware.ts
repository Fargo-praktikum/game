import { NextFunction, Request, Response } from "express";
let i = 0;

export const serverAuthMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
    const cookie = req.cookies;

    console.log(req.secure);
    console.log("cookie");
    console.dir(cookie);
    // console.log('req');
    // console.log(req);
    // console.log(req.headers);
    console.log(`i = ${i};`);
    i++;

    next();
};

