import { Router } from "express";
import CommentApi from "../api/commentApi";

export const commentRoutes = (router: Router) => {

    const commentRoute = Router();

    // TODO тут в качестве миддваре должна передавать аутентификация. Прикрутить, когда появится
    commentRoute
        .get("/", [], CommentApi.request)
        .post("/", [], CommentApi.create)
        .post("/:commentId/add-emoji", [], CommentApi.addEmoji);

    router.use("/api/comments", commentRoute);
};
