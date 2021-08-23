import React from "react";

import PopupForm from "../PopupForm";
import PopupboxManager from "../../common/PopupConstructor/PopupboxManager";

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

const openPopupAddTopic = () => {
    const content = (
        <PopupForm {...{
            title: "Новый топик",
            form: <AddTopicForm onSubmitCallback={PopupboxManager.close.bind(PopupboxManager)}/>
        }}/>
    );
    popupOpen(content);
};


export {
    openPopupAddTopic
};
