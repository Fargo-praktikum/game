import { Router } from "express";
import CommentApi from "../api/commentApi";
import { apiAuthMiddleware } from "../middlewares/serverAuthMiddleware";

export const commentRoutes = (router: Router) => {

    const commentRoute = Router();

    commentRoute
        .get("/", [apiAuthMiddleware], CommentApi.request)
        .post("/", [apiAuthMiddleware], CommentApi.create)
        .post("/:commentId/add-emoji", [apiAuthMiddleware], CommentApi.addEmoji);

    router.use("/api/comments", commentRoute);
};
