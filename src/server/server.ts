import path from "path";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import serverRenderMiddleware from "./serverRenderMiddleware";
import { serverAuthMiddleware } from "./serverAuthMiddleware";

const app = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
app
    .use(cookieParser())
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", serverAuthMiddleware, serverRenderMiddleware);

export { app };
