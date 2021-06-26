import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { baseUrl, mainHost } from "../../configs/baseUrl";
import { setUser } from "../../src/store/authReducer";
import store from "../../src/store/store";
// let i = 0;

export const serverAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.protocol !== "https") return next();
    if (!req.hostname.endsWith(mainHost)) return next();

    const cookies = req.cookies;
    const hasCookies = Object.keys(cookies).length > 0;
    const isLoginUrl = req.headers.referer?.search(/\/login$/i) != -1 || req.url === "/login";
    const goNextMiddleware = !hasCookies && isLoginUrl;

    if (goNextMiddleware) {
        console.log("goNextMiddleware");
        return next();
    }

    let stringCookies = "";

    if (cookies) {
        Object.entries<string>(cookies).forEach(([key, value], ind) => {
            stringCookies += `${ind === 0 ? "" : " "}${key}=${value};`;
        });
    }

    // console.log(`i = ${i};`);
    // i++;

    axios
        .get(`${baseUrl}/auth/user`, {
            headers: {
                Cookie: stringCookies
            }
        })
        .then(resp => {
            return store.dispatch(setUser(resp.data));
        })
        .then((_res) => {
            next();
        })
        .catch(_err => {
            res.redirect("/login");
        });
};

