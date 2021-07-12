import { Router } from "express";
import ThemeApi from "../api/themeApi";
import { setApiAuthMiddleware } from "../helpers/setApiAuthMiddleware";


export const themeRoutes = (router: Router) => {
    const themeRoute = Router();

    themeRoute
        .get("/", setApiAuthMiddleware(), ThemeApi.request)
        .post("/", setApiAuthMiddleware(), ThemeApi.create)
        .put("/", setApiAuthMiddleware(), ThemeApi.update);

    router.use("/api/theme", themeRoute);
};
