import { Router } from "express";
import ThemeApi from "../api/themeApi";
import { apiAuthMiddleware } from "../middlewares/serverAuthMiddleware";

export const themeRoutes = (router: Router) => {

    const themeRoute = Router();

    themeRoute
        .get("/", [apiAuthMiddleware], ThemeApi.request)
        .post("/", [apiAuthMiddleware], ThemeApi.create)
        .put("/", [apiAuthMiddleware], ThemeApi.update);

    router.use("/api/theme", themeRoute);
};
