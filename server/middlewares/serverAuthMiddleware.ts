import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { baseUrl } from "../../configs/baseUrl";
import { setUser } from "../../src/store/authReducer";
import store from "../../src/store/store";
// let i = 0;

export const serverAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    // const cookiesCount = Object.keys(cookies).length;
    // const isLoginUrl = req.headers.referer?.search(/\/login$/i) != -1 || req.url === "/login";
    // const goNextMiddleware = cookiesCount === 0 && isLoginUrl;
    const goNextMiddleware = true;
    console.log("goNextMiddleware");
    console.log(goNextMiddleware);

    if (goNextMiddleware) {
        console.log("должен прервать serverAuthMiddleware");
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

