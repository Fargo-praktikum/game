import path from "path";
import express, { RequestHandler } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import serverRenderMiddleware from "./middlewares/serverRenderMiddleware";
import { serverAuthMiddleware } from "./middlewares/serverAuthMiddleware";


const isDev = process.env.NODE_ENV === "development";
const isHttps = process.env.HTTP_PROTOCOL === "https";

const server = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
server
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")));

const getMiddlewares = [
    !(isDev && !isHttps) && serverAuthMiddleware,
    serverRenderMiddleware
].filter(Boolean) as Array<RequestHandler>;

server.get("/*", getMiddlewares);

export { server };
