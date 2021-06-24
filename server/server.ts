import path from "path";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import serverRenderMiddleware from "./middlewares/serverRenderMiddleware";
import { serverAuthMiddleware } from "./middlewares/serverAuthMiddleware";

const server = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
server
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")));

server.get("/*", serverAuthMiddleware, serverRenderMiddleware);

export { server };
