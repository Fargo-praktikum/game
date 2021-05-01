import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./MessageAndComments.scss";

import { rootStateType } from "../../../scripts/redux/store";

import Message from "../Message/Message";
import AddCommentForm from "../../Popups/PopupForms/AddCommentForm";


const MessageAndComments = () => {
    const topicsList = useSelector((state: rootStateType) => state.forum.topicsList);
    const { topicId, messageId } = useParams<{ topicId: string, messageId: string }>();

    // TODO: СРЕДНЕ. В дальнейшем будем делать запрос по конкретному форуму
    const message = topicsList?.find((topic) => {
        return topic.id === Number(topicId);
    })?.messages?.find((message) => {
        return message.id === Number(messageId);
    });

    // const createComment = () => {
    //     console.log('нажал createComment!!!');
    //     openPopupAddComment()
    // }


    return (
        <section className="MC__general">
            <h2 className="MC__title">{message?.title}</h2>

            <div className="MC__main">
                <Message {...{
                    date: message?.date,
                    message: message?.description,
                    user: message?.user
                }}/>
            </div>

            <div className="MC__comments">
                {message?.comments &&
                message.comments.map((comment, ind) => {
                    return <Message {...comment} key={ind}/>;
                })}
            </div>

            <p className="MC__sendComment">Оставить комментарий</p>
            <AddCommentForm/>
        </section>
    );
};

export default MessageAndComments;
