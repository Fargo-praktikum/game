import path from "path";
import express from "express";
import compression from "compression";
import serverRenderMiddleware from "./serverRenderMiddleware";
// import themes from "../../routes/themes";
const themeRouter = require('../../db/routes/theme.routes')

const router = express.Router();

const app = express();

// TODO автор, по мануалу которого сделан SSR, рекомендует использовать это только для dev вурсии
// а в prod юзать для этого nginx
app
    .use(compression())
    .use(express.static(path.resolve(__dirname, "../dist")));

app.use(express.json());

app.use("/api", themeRouter);

app.use("/test",  router.get("/", (_req, res) => res.send("TrrHEME")));
app.get("/*", serverRenderMiddleware);

export { app };
