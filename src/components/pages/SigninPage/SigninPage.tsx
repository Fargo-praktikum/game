import React from "react";
import { SigninForm } from "../../SigninForm/SigninForm";

import "../../../styles/page.scss";
import { useSelector } from "react-redux";
import { rootStateType } from "../../../scripts/redux/store";
import { useHistory } from "react-router-dom";

export const SigninPage = (): JSX.Element => {

    const userInfo = useSelector((state: rootStateType) => state.auth.userInfo);
    const history = useHistory();

    if (userInfo.login != null) {
        history.push("/game");
    }

    return (
        <main className="page page_centered">
            <SigninForm />
        </main>
    );
};
