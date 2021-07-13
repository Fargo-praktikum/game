import React from "react";

import "./TopicsList.scss";

import { TRootState } from "../../../store/store";
import { setStyle } from "../../../scripts/utils/setStyle";
import CoolButton from "../../common/FormElements/Button/CoolButton";
import { useAppSelector } from "../../../hooks/storeHooks";
import { openPopupAddTopic } from "../../Popups/PopupFuncs/PopupFuncs";
import { useHistory } from "react-router-dom";


const TopicsList = (): JSX.Element => {
    const topicsList = useAppSelector((state: TRootState) => state.forum.topics);

    const history = useHistory();

    const openTopicItem = (topicId: number) => {
        return () => {
            history.push(`/forum/${topicId}`);
        };
    };

    const createTopic = () => {
        openPopupAddTopic();
    };

    return (
        <section className="topics">
            <div className="topics__header">
                {/* TODO: СРЕДНЕ. Сделать пагинатор */}
                <div className="paginator">Здесь будет пагинатор</div>
                <CoolButton clickHandler={createTopic} text={"Создать топик"}/>
            </div>
            <div className="topics__card-container">
                {topicsList &&
                topicsList.map((topic, ind) => {
                    return (
                        <div className={`topics__item ${setStyle(ind % 2 === 1, "topics__item_two")}`} key={topic.id}>
                            <div>
                                <h3 className="f-list__list-title" onClick={openTopicItem(topic.id)}>{topic.title}</h3>
                            </div>
                            <div className="f-list__from-container">
                                <p className="f-list__from">
                                    {topic.user.name}
                                </p>
                                <div className="f-list_text">{topic.createdAt.toLocaleString("en-US")}</div>
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
