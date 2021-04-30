import React from "react";
import { ProfileForm } from "../../ProfileForm/ProfileForm";

import "../../../styles/page.scss";

export const ProfilePage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <ProfileForm />
        </main>
    );
};
