import { useField } from "formik";
import React from "react";
import { TextBox } from "../../TextBox";
import { ProfileFormFieldProps } from "./types";
import "./ProfileFormField.scss";

export const ProfileFormField = (props: ProfileFormFieldProps): JSX.Element => {

    const [field, meta] = useField(props);

    return (
        <div className="form__field">
            <label className="form__name">{props.label}</label>
            <div>
                <TextBox
                    type={props.type ?? "text"}
                    placeholder={props.placeholder ?? props.label}
                    className="form__textinput-profile right"
                    {...field}
                />
                {meta.touched && meta.error ? (
                    <div className="floating-label-form__error-message">{meta.error}</div>
                ) : null}
            </div>
        </div>
    );
};
