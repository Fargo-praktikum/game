import React, { useCallback } from "react";
import { TRootState } from "../../../store/store";

import "./TopicsList.scss";

import { setStyle } from "../../../scripts/utils/setStyle";
import topicImg from "../../../assets/chat.png";
import { Comment, Message } from "../../../store/forumReducer";
import { getTimeInfo } from "../../../scripts/utils/timeHandler";
import { useHistory } from "react-router-dom";
import CoolButton from "../../common/FormElements/Button/CoolButton";
import { openPopupAddTopic } from "../../Popups/PopupFuncs/PopupFuncs";
import { useAppSelector } from "../../../hooks/storeHooks";

export const getTopicsOrCommentsCount = (topics: Message[] | Comment[] | null): number => {
    return topics ? topics.length : 0;
};

const createTopic = () => {
    console.log("нажал createTopic!!!");
    openPopupAddTopic();
};

const TopicsList = (): JSX.Element => {
    const topicsList = useAppSelector((state: TRootState) => state.forum.topicsList);
    const history = useHistory();

    const openForumItem = useCallback((id: number) => {
        return () => {
            history.push(`/forum/${id}`);
        };
    }, []);



    return (
        <section className="f-list">
            <div className="f-list__header">
                <h2 className="f-list__title">Topics</h2>
                <CoolButton clickHandler={createTopic} text={"Создать топик"}/>
            </div>
            <div className="f-list__card-container">
                {topicsList &&
                topicsList.map((topic, ind) => {
                    const { id, title, description, messages, lastCommentInfo } = topic;

                    return (
                        <div className={`f-list__item ${setStyle(ind % 2 === 1, "f-list__item_two")}`} key={ind}>
                            <img className="f-list__img" src={topicImg} alt="img"/>
                            <div className="f-list__info">
                                <h3 className="f-list__list-title" onClick={openForumItem(id)}>{title}</h3>
                                <p className="f-list__list-descr">{description}</p>
                            </div>
                            <div className="f-list__list-messages">
                                <p className="f-list__messages-count">{getTopicsOrCommentsCount(messages)}</p>
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
                    );
                })
                }
            </div>
        </section>
    );
};

export default TopicsList;
