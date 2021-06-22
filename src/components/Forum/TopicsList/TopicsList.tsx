import React from "react";
// import { useHistory, useParams } from "react-router-dom";

import "./TopicsList.scss";

import { TRootState } from "../../../store/store";
import { setStyle } from "../../../scripts/utils/setStyle";
// import { getTimeInfo } from "../../../scripts/utils/timeHandler";
// import { getTopicsOrCommentsCount } from "./TopicsList";
// import { lastElem } from "../../../scripts/utils/myDash/last";
import CoolButton from "../../common/FormElements/Button/CoolButton";
// import { openPopupAddMessage } from "../../Popups/PopupFuncs/PopupFuncs";
import { useAppSelector } from "../../../hooks/storeHooks";


const TopicsList = (): JSX.Element => {
    const topicsList = useAppSelector((state: TRootState) => state.forum.topics);

    //const history = useHistory();

    // const openTopicItem = (messageId: number) => {
    //     return () => {
    //         history.push(`/forum/${topicId}/${messageId}`);
    //     };
    // };

    // const createMessage = () => {
    //     console.log("нажал createTopic!!!");
    //     openPopupAddMessage();
    // };


    return (
        <section className="topics">
            <div className="topics__header">
                {/* TODO: СРЕДНЕ. Сделать пагинатор */}
                <div className="paginator">Здесь будет пагинатор</div>
                {/* <CoolButton clickHandler={createMessage} text={"Написать сообщение"}/> */}
                <CoolButton text={"Создать топик"}/>
            </div>
            <div className="topics__card-container">
                {topicsList &&
                topicsList.map((topic, ind) => {
                    return (
                        <div className={`topics__item ${setStyle(ind % 2 === 1, "topics__item_two")}`} key={topic.id}>
                            <div>
                                {/* <h3 className="f-list__list-title" onClick={openTopicItem(id)}>{title}</h3> */}
                                <h3 className="f-list__list-title">{topic.title}</h3>
                            </div>
                            <div className="f-list__from-container">
                                <p className="f-list__from">
                                    {topic.user.name}
                                </p>
                                <div className="f-list_text">{topic.createdAt.toLocaleString()}</div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </section>
    );
};

export default TopicsList;
