import React from "react";
import { FloatingFormFieldProps } from "./types";
import "./ProfileViewField.scss";
import "../ProfileFormField/ProfileFormField.scss";

export const ProfileViewField = (props: FloatingFormFieldProps): JSX.Element => {


    return (
        <div className="form__field">
            <span className="form__field-name">{props.label}</span>
            <div>
                <span className="text-profile right">{props.placeholder}</span>
            </div>
        </div>
    );
};
