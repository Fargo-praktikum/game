import React from "react";
import { ErrorInfo } from "../../ErrorInfo";

import "../../../styles/page.scss";

export const NotFoundPage = (): JSX.Element => {
    return (
        <main className="page page_centered">
            <ErrorInfo
                errorName="404"
                message="Не туда попали"
            />
        </main>
    );
};
