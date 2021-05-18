import React from "react";
import { SigninForm } from "../../SigninForm/SigninForm";

import "../../../styles/page.scss";
import { TRootState } from "../../../store/store";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks/storeHooks";

export const SigninPage = (): JSX.Element => {

    const userInfo = useAppSelector((state: TRootState) => state.auth.userInfo);
    const history = useHistory();

    if (userInfo && userInfo.login !== null) {
        history.push("/game");
    }

    return (
        <main className="page page_centered">
            <SigninForm />
        </main>
    );
};
