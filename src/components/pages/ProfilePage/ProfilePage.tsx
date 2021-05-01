import React from "react";
import { SidebarProfile } from "../../Profile/SidebarProfile/SidebarProfile";

import "../../../styles/page.scss";
import "./ProfilePage.scss";
import { ProfileView } from "../../Profile/ProfileView/ProfileView";

export const ProfilePage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <div className="wrap">
                <SidebarProfile />
                <ProfileView />
            </div>
        </main>
    );
};
