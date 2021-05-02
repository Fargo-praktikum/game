import React from "react";
import { SigninForm } from "../../SigninForm/SigninForm";

import "../../../styles/page.scss";

export const SigninPage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <SigninForm />
        </main>
    );
};
