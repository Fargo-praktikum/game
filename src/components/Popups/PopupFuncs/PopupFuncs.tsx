import React from "react";

import PopupForm from "../PopupForm";
import PopupboxManager from "../../common/PopupConstructor/PopupboxManager";

import AddMessageForm from "../PopupForms/AddMessageForm";
import AddTopicForm from "../PopupForms/AddTopicForm";


const popupOpen = (content: JSX.Element) => {
    PopupboxManager.open({
        content,
        config: {
            fadeIn: true,
            fadeInSpeed: 200,
            padding: false
        }
    });
};

const openPopupAddTopic = (): void => {
    const content = (
        <PopupForm {...{
            title: "Создать новый топик",
            form: <AddTopicForm/>
        }}/>
    );
    popupOpen(content);
};
const openPopupAddMessage = () => {
    const content = (
        <PopupForm {...{
            title: "Новое сообщение",
            form: <AddMessageForm/>
        }}/>
    );
    popupOpen(content);
};


export {
    openPopupAddTopic,
    openPopupAddMessage,
};
