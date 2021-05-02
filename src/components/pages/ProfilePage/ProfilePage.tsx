import React from "react";
import { SidebarProfile } from "../../Profile/SidebarProfile/SidebarProfile";

import "../../../styles/page.scss";
import "./ProfilePage.scss";
import { ProfileMain } from "../../Profile/ProfileMain/ProfileMain";
import { ProfileForm } from "../../Profile/ProfileForm/ProfileForm";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProfileChangePwdForm } from "../../Profile/ProfileChangePwdForm/ProfileChangePwdForm";

export const ProfilePage = (): JSX.Element => {
    const { path } = useRouteMatch();

    return (
        <main className="page page_centered">
            <div className="wrap">
                <SidebarProfile />
                <Switch>
                    <Route exact path={path}>
                        <ProfileMain />
                    </Route>
                    <Route path={`${path}/change`}>
                        <ProfileForm />
                    </Route>
                    <Route path={`${path}/change_password`}>
                        <ProfileChangePwdForm />
                    </Route>
                </Switch>
            </div>
        </main>
    );
};
