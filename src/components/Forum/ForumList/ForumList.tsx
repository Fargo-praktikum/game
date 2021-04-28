import React from "react";
import {useSelector} from "react-redux";
import {rootStateType} from "src/scripts/redux/store";

import "./ForumList.scss";

import {setStyle} from "../../../scripts/utils/setStyle";
import topicImg from "../../../assets/chat.png";
import {ITopic} from "../../../scripts/redux/forumReducer";
import {getTimeInfo} from "../../../scripts/utils/timeHandler";

const getTopicsCount = (topics: ITopic[] | null) => {
    return topics ? topics.length : 0;
};

const ForumList = () => {
    const forumList = useSelector((state: rootStateType) => state.forum.forumList);

    return (
        <section className="f-list">
            <div className="f-list__header">
                <h2 className="f-list__title">Форумы</h2>
            </div>
            <div className="f-list__card-container">
                {forumList &&
                forumList.map((forumItem, ind) => {
                    const {title, description, topics, lastCommentInfo} = forumItem;

                    return (
                        <div className={`f-list__item ${setStyle(ind % 2 === 1, 'f-list__item_two')}`} key={ind}>
                            <img className="f-list__img" src={topicImg} alt="img"/>
                            <div className="f-list__info">
                                <h3 className="f-list__list-title">{title}</h3>
                                <p className="f-list__list-descr">{description}</p>
                            </div>
                            <div className="f-list__list-topics">
                                <p className="f-list__topics-count">{getTopicsCount(topics)}</p>
                                <p className="f-list__text">сообщений</p>
                            </div>
                            {lastCommentInfo &&
                            <div className="f-list__from-container">
                                <p className="f-list__where">{lastCommentInfo.topicTitle}</p>
                                <p className="f-list__from">
                                    <span className="f-list_text">От </span>
                                    {lastCommentInfo.comment.user.firstName}
                                    {" "}
                                    {lastCommentInfo.comment.user.secondName}
                                </p>
                                <time className="f-list_text">{getTimeInfo(lastCommentInfo.comment.date)}</time>
                            </div>
                            }
                        </div>
                    )
                })
                }
            </div>
        </section>
    );
};

export default ForumList;
