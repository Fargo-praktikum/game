import { Router } from "express";
import CommentApi from "../api/commentApi";
import { setApiAuthMiddleware } from "../helpers/setApiAuthMiddleware";


export const commentRoutes = (router: Router) => {
    const commentRoute = Router();

    commentRoute
        .get("/", setApiAuthMiddleware(), CommentApi.request)
        .post("/", setApiAuthMiddleware(), CommentApi.create)
        .post("/:commentId/add-emoji", setApiAuthMiddleware(), CommentApi.addEmoji);

    router.use("/api/comments", commentRoute);
};
