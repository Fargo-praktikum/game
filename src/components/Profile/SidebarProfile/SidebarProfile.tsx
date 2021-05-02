import React from "react";

import "./SidebarProfile.scss";
import ProfileArrowButton from "../../../assets/profileArrowButton.svg";

export const SidebarProfile = (): JSX.Element => {

    return (
        <div className="profile__sidebar">
            <button onClick={() => history.back()} className="profile__button">
                <img src={ProfileArrowButton} alt="назад"/>
            </button>
        </div>
    );
};
