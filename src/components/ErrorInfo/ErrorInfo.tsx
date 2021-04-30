import React from "react";
import { Link } from "react-router-dom";
import { ErrorInfoProps } from "./types";

import "./ErrorInfo.scss";

export const ErrorInfo = ({ errorName, message }: ErrorInfoProps): JSX.Element => {
    return (
        <div className="error-info">
            <h1 className="error-info__head">
                {errorName}
            </h1>
            <div className="error-info__message">
                {message}
            </div>
            <Link to="/" className="error-info__back-link">
                На главную
            </Link>
        </div>
    );
};
