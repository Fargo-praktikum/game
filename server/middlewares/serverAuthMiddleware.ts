import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { baseUrl } from "../../configs/baseUrl";
import { setUser } from "../../src/store/authReducer";
import store from "../../src/store/store";
import { setTheme } from "../../src/store/gameReducer";
import https from "https";

const checkHasAuthCookie = (cookies: any): boolean => {
    return ("authCookie" in cookies);
};

const cookieToString = (cookies: any): string => {

    let res = "";

    if (cookies) {
        Object.entries<string>(cookies).forEach(([key, value], ind) => {
            res += `${ind === 0 ? "" : " "}${key}=${value};`;
        });
    }

    return res;
};

export const pagesAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
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
            getThemeInit(resp.data.id);
            return store.dispatch(setUser(resp.data));
        })

        .then((_res) => {
            next();
        })
        .catch(err => {
            console.log("SeverAuthMiddleware ERROR - ", err.response.data);
            next();
        });

    // TODO игнорирую отсутствие SSL сертификата, убрать когда добавим https://github.com/axios/axios/issues/535
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    const getThemeInit = (id: string) => {
        axios
            .get(`${baseUrl}/api/theme?id=${id}`, { httpsAgent: agent })
            .then(res => {
                store.dispatch(setTheme(res.data.theme));
            })
            .catch(e => console.log(e, "error - get theme init"));
    };
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
            console.log("SeverAuthMiddleware ERROR - ", err.response.data);
            return failedAction();
        });
};
