import React from "react";

import "./TextInputs.scss";


export const TextField = ({ touched, error, ...restProps }: any): JSX.Element => {
    const hasError = touched && error;

    return (
        <div className={`formControl ${hasError ? "errorInput" : ""}`}>
            <input className="text-field"
                {...restProps} />
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    );

};


