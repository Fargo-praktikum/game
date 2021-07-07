import { Router } from "express";
import ThemeApi from "../api/themeApi";

export const themeRoutes = (router: Router) => {

    const themeRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    themeRoute
        .get("/", [], ThemeApi.request)
        .post("/", [], ThemeApi.create)
        .put("/", [], ThemeApi.update);

    router.use("/api/theme", themeRoute);
};
