import React from "react";

import "./SidebarProfile.scss";
import ProfileArrowButton from "../../../assets/profileArrowButton.svg";

export const SidebarProfile = (): JSX.Element => {

    return (
        <div className="profile-sidebar">
            <div className="profile-sidebar__arrow">
                <button className="profile-button">
                    <img src={ProfileArrowButton} alt="назад"/>
                </button>
            </div>
        </div>
    );
};
