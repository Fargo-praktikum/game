import React from "react";

import PopupForm from "../PopupForm";
import PopupboxManager from "../../common/PopupConstructor/PopupboxManager";

const popupOpen = (content: JSX.Element) => {
  PopupboxManager.open({
    content,
    config: {
      // overlayOpacity: 0.6,
      fadeIn: true,
      fadeInSpeed: 200,
      padding: false,
      // closeBtn: false
    }
  })
}

// const openPopupBoxAddTopic = (forumId: number, history) => {
const openPopupBoxAddTopic = () => {
  const content = (
      <PopupForm {...{
          title: 'Создать новую тему'
      }}/>
  );
  popupOpen(content);
};


export {
    openPopupBoxAddTopic,
}
