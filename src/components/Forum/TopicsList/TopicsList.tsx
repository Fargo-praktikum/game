import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import "./TopicsList.scss";

import {rootStateType} from "../../../scripts/redux/store";
import {setStyle} from "../../../scripts/utils/setStyle";
import {getTimeInfo} from "../../../scripts/utils/timeHandler";
import {getTopicsOrCommentsCount} from "../ForumList/ForumList";
import {lastElem} from "../../../scripts/utils/myDash/last";
import CoolButton from "../../common/FormElements/Button/CoolButton";
import {openPopupBoxAddTopic} from "../../Popups/PopupFuncs/PopupFuncs";


const TopicsList = () => {
    const forumList = useSelector((state: rootStateType) => state.forum.forumList);
    const {forumId} = useParams<{ forumId: string }>();
    // TODO: СРЕДНЕ. В дальнейшем будем делать запрос по конкретному форуму
    const topics = forumList?.find((forumItem) => forumItem.id === Number(forumId))?.topics;
    const history = useHistory();

    const openTopicItem = (topicId: number) => {
        return () => {
            history.push(`/forum/${forumId}/${topicId}`);
        }
    }
    const createTopic = () => {
        console.log('нажал createTopic!!!');
        openPopupBoxAddTopic()
    }


    return (
        <section className="topics">
            <div className="topics__header">
                {/* TODO: СРЕДНЕ. Сделать пагинатор */}
                <div className="paginator">Здесь будет пагинатор</div>
                <CoolButton clickHandler={createTopic} text={'Создать новую тему'}/>
            </div>
            <div className="topics__card-container">
                {topics &&
                topics.map((topic, ind) => {
                    const {id, title, description, comments} = topic;

                    return (
                        <div className={`topics__item ${setStyle(ind % 2 === 1, 'topics__item_two')}`} key={ind}>
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

export default TopicsList;
