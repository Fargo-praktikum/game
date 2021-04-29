import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import "./MessagesList.scss";

import {rootStateType} from "../../../scripts/redux/store";
import {setStyle} from "../../../scripts/utils/setStyle";
import {getTimeInfo} from "../../../scripts/utils/timeHandler";
import {getTopicsOrCommentsCount} from "../TopicsList/TopicsList";
import {lastElem} from "../../../scripts/utils/myDash/last";
import CoolButton from "../../common/FormElements/Button/CoolButton";
import {openPopupAddMessage} from "../../Popups/PopupFuncs/PopupFuncs";


const MessagesList = () => {
    const topicsList = useSelector((state: rootStateType) => state.forum.topicsList);
    const {topicId} = useParams<{ topicId: string }>();
    // TODO: СРЕДНЕ. В дальнейшем будем делать запрос по конкретному форуму
    const messages = topicsList?.find((topic) => topic.id === Number(topicId))?.messages;
    const history = useHistory();

    const openTopicItem = (messageId: number) => {
        return () => {
            history.push(`/forum/${topicId}/${messageId}`);
        }
    }
    const createMessage = () => {
        console.log('нажал createTopic!!!');
        openPopupAddMessage()
    }


    return (
        <section className="messages">
            <div className="messages__header">
                {/* TODO: СРЕДНЕ. Сделать пагинатор */}
                <div className="paginator">Здесь будет пагинатор</div>
                <CoolButton clickHandler={createMessage} text={'Написать сообщение'}/>
            </div>
            <div className="messages__card-container">
                {messages &&
                messages.map((message, ind) => {
                    const {id, title, description, comments} = message;

                    return (
                        <div className={`messages__item ${setStyle(ind % 2 === 1, 'messages__item_two')}`} key={ind}>
                            <div className="f-list__info">
                                <h3 className="f-list__list-title" onClick={openTopicItem(id)}>{title}</h3>
                                <p className="f-list__list-descr">{description}</p>
                            </div>
                            <div className="f-list__list-topics">
                                <p className="f-list__topics-count">{getTopicsOrCommentsCount(comments)}</p>
                                <p className="f-list__text">ответа</p>
                            </div>
                            {comments &&
                            <div className="f-list__from-container">
                                <p className="f-list__from">
                                    {lastElem(comments).user.firstName}
                                    {" "}
                                    {lastElem(comments).user.secondName}
                                </p>
                                <time className="f-list_text">{getTimeInfo(lastElem(comments).date)}</time>
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

export default MessagesList;
