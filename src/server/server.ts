import path from "path";
import express from "express";
import compression from "compression";
import serverRenderMiddleware from "./serverRenderMiddleware";

const app = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
app
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", serverRenderMiddleware);

export { app };
