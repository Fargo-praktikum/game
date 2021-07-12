import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { baseUrl } from "../../configs/baseUrl";

const checkHasAuthCookie = (cookies: any): boolean => {
    return ("authCookie" in cookies);
};

const cookieToString = (cookies: Record<string, string>): string => {

    let res = "";

    if (cookies) {
        Object.entries<string>(cookies).forEach(([key, value], ind) => {
            res += `${ind === 0 ? "" : " "}${key}=${value};`;
        });
    }

    return res;
};

export const pagesAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    const hasAuthCookie = checkHasAuthCookie(cookies);

    const isLoginUrl = req.headers.referer?.search(/\/login$/i) != -1 || req.url === "/login";

    const goNextMiddleware = !hasAuthCookie && isLoginUrl;

    if (goNextMiddleware) {
        console.log("должен прервать serverAuthMiddleware");
        return next();
    }

    const stringCookies = cookieToString(cookies);

    axios
        .get(`${baseUrl}/auth/user`, {
            headers: {
                Cookie: stringCookies
            }
        })
        .then(resp => {
            res.locals["user"] = resp.data;
        })
        .then((_res) => {
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        });
};

export const apiAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    const failedAction = () => { res.status(401).send(); };

    const hasAuthCookie = checkHasAuthCookie(cookies);

    if (!hasAuthCookie) {
        return failedAction();
    }

    const stringCookies = cookieToString(cookies);

    axios
        .get(`${baseUrl}/auth/user`, {
            headers: {
                Cookie: stringCookies
            }
        })
        .then(resp => {
            res.locals["user"] = resp.data;
        })
        .then((_res) => {
            next();
        })
        .catch(err => {
            console.log(err);
            return failedAction();
        });
};
