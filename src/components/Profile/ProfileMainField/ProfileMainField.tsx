import React from "react";
import { ProfileMainFieldProps } from "./types";
import "./ProfileMainField.scss";
import "../ProfileFormField/ProfileFormField.scss";

export const ProfileMainField = (props: ProfileMainFieldProps): JSX.Element => {
    return (
        <div className="form__field">
            <span className="form__name">{props.label}</span>
            <div>
                <span className="form__text-profile right">{props.placeholder}</span>
            </div>
        </div>
    );
};
