import React from "react";
import { SignupForm } from "../../SignupForm/SignupForm";

import "../../../styles/page.scss";

export const SignupPage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <SignupForm />
        </main>
    );
};
