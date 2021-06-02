import React from "react";
import { SigninForm } from "../../SigninForm/SigninForm";

import "../../../styles/page.scss";
import { TRootState } from "../../../store/store";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../../../hooks/storeHooks";

export const SigninPage = (): JSX.Element => {

    const userInfo = useAppSelector((state: TRootState) => state.auth.userInfo);

    return (
        <main className="page page_centered">
            { userInfo && userInfo.login !== null
                ? <Redirect to="/game"/>
                : <SigninForm/>
            }
        </main>
    );
};
