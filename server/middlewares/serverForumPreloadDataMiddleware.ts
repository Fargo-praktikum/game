import { NextFunction, Request, Response } from "express";
import { Comment } from "../db/models/forum/comment";
import { Emoji } from "../db/models/forum/emoji";
import { Topic } from "../db/models/forum/topic";
import CommentService from "../services/commentService";
import EmojiService from "../services/emojiService";
import TopicService from "../services/topicService";

export const serverForumPreloadDataMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const topicId = req.params.topicId;

    let topics: { rows: Topic[], count: number } = { rows: [], count: 0 };
    let comments: Comment[] = [];
    let emojies: Emoji[] = [];

    const promises: Promise<void>[] = [];

    promises.push(
        new TopicService().request({})
            .then((result) => {
                topics = result;
            })
    );

    if (topicId) {
        promises.push(
            new CommentService().request(parseInt(topicId))
                .then((result) => {
                    comments = result;
                })
        );

        promises.push(
            new EmojiService().request()
                .then((result) =>{
                    emojies = result;
                })
        );
    }

    Promise.all(promises)
        .then(() => {
            res.locals["forumPreload"] = {
                topics,
                comments,
                emojies
            };
            next();
        })
        .catch((err) => {
            console.error(err);
            next();
        });
};
