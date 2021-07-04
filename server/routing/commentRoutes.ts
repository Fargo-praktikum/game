import { Router } from "express";
import CommentApi from "../api/commentApi";
import { apiAuthMiddleware } from "../middlewares/serverAuthMiddlewares";

export const commentRoutes = (router: Router) => {

    const commentRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    commentRoute
        .get("/", [apiAuthMiddleware], CommentApi.request)
        .post("/", [apiAuthMiddleware], CommentApi.create)
        .post("/:commentId/add-emoji", [apiAuthMiddleware], CommentApi.addEmoji);

    router.use("/api/comments", commentRoute);
};
