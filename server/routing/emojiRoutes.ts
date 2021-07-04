import { Router } from "express";
import EmojiApi from "../api/emojiApi";
import { apiAuthMiddleware } from "../middlewares/serverAuthMiddlewares";

export const emojiRoutes = (router: Router) => {

    const emojiRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    emojiRoute
        .get("/", [apiAuthMiddleware], EmojiApi.request);

    router.use("/api/emojies", emojiRoute);
};
