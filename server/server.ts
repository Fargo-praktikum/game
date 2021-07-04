import path from "path";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./routing/router";


const server = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
server
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(router);

export { server };
