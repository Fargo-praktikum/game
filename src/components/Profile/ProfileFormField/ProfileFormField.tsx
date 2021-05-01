import { useField } from "formik";
import React from "react";
import { TextBox } from "../../TextBox";
import { FloatingFormFieldProps } from "./types";
import "./ProfileFormField.scss";

export const ProfileFormField = (props: FloatingFormFieldProps): JSX.Element => {

    const [field, meta] = useField(props);

    return (
        <div className="form__field">
            <span className="form__field-name">{props.label}</span>
            <div>
                <TextBox
                    type={props.type ?? "text"}
                    placeholder={props.placeholder ?? props.label}
                    className="textinput-profile right"
                    {...field}
                />
                {meta.touched && meta.error ? (
                    <div className="floating-label-form__error-message">{meta.error}</div>
                ) : null}
            </div>
        </div>
    );
};
