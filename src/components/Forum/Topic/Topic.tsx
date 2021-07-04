import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Topic from "../../../models/forum/topic";
import { Redirect, useParams } from "react-router-dom";

import "./Topic.scss";

import Message from "../Message/Message";
import AddCommentForm from "../../Popups/PopupForms/AddCommentForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { addCommentEmoji, getComments, getEmojies } from "../../../store/forumReducer";
import { TRootState } from "../../../store/store";

const Topic = (): JSX.Element => {

    const { topicId } = useParams<{ topicId: string }>();

    const topic = useAppSelector((state: TRootState) => {
        return state.forum.topics.find((item) => {
            return item.id === parseInt(topicId);
        });
    });

    if (!topic) {
        return (
            <Redirect to={{
                pathname: "/404"
            }}
            />
        );
    }

    const comments = useAppSelector((state: TRootState) => state.forum.comments);
    const emojies = useAppSelector((state: TRootState) => state.forum.emojies);

    const dispatch = useAppDispatch();

    const commentEmojiCallback = useCallback(
        async (commentId: number, emojiId: number) => {
            dispatch(addCommentEmoji({ commentId, emojiId }));
        },
        []
    );

    const [replyTo, setReplyTo] = useState<number | null>(null);

    const messageReplyClickCallback = useCallback(
        (e: SyntheticEvent, id: number | null) => {
            e.preventDefault();
            setReplyTo(id);
        },
        []
    );

    // см https://github.com/facebook/react/issues/14326
    useEffect(() => {

        async function fetchData() {
            await Promise.all([
                dispatch(getEmojies()),
                dispatch(getComments(parseInt(topicId)))
            ]);
        }

        fetchData();

    }, [topicId]);

    return (
        <section className="MC__general">
            <h2 className="MC__title">{topic.title}</h2>

            <div className="MC__main">
                <Message {...{
                    date: topic.createdAt,
                    message: topic.message,
                    user: topic.user
                }}/>
            </div>

            <div className="MC__comments">
                {comments &&
                comments.map((comment) => {

                    const msg = {
                        id: comment.id,
                        message: comment.content,
                        user: comment.user,
                        date: comment.createdAt,
                        emojies,
                        emojiesCount: comment.emojies,
                        emojiClickCallback: commentEmojiCallback,
                        messageReplyClickCallback,
                        parentId: comment.parentId
                    };

                    return <Message {...msg} key={comment.id}/>;
                })}
            </div>

            <p className="MC__sendComment">
                Оставить комментарий
                {replyTo &&
                    <span>в ответ на&nbsp;<a href={`#${replyTo}`}>{replyTo}</a></span>
                }
                &nbsp;
                {
                    replyTo &&
                    <a href="#" onClick={(e) => messageReplyClickCallback(e, null)}>Отменить ответ</a>
                }
            </p>
            <AddCommentForm replyTo={replyTo} topicId={topic.id}/>
        </section>
    );
};

export default Topic;
