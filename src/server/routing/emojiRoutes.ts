import { Router } from "express";
import EmojiApi from "../api/emojiApi";

export const emojiRoutes = (router: Router) => {

    const emojiRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    emojiRoute
        .get("/", [], EmojiApi.request);

    router.use("/api/emojies", emojiRoute);
};
