import React from "react";
import { ProfileForm } from "../../ProfileForm/ProfileForm";
import { SidebarProfile } from "../../SidebarProfile/SidebarProfile";

import "../../../styles/page.scss";
import "./ProfilePage.scss";

export const ProfilePage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <div className="wrap">
                <SidebarProfile />
                <ProfileForm />
            </div>
        </main>
    );
};
