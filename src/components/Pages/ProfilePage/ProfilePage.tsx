import React from "react";
import { ProfileForm } from "../../ProfileForm/ProfileForm";
import { SidebarProfile } from "../../SidebarProfile/SidebarProfile";

import "../../../styles/page.scss";

export const ProfilePage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <SidebarProfile />
            <ProfileForm />
        </main>
    );
};
