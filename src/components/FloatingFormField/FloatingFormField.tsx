import { useField } from "formik";
import React from "react";
import { TextBox } from "../TextBox";
import { FloatingFormFieldProps } from "./types";

export const FloatingFormField = (props: FloatingFormFieldProps): JSX.Element => {

    const [field, meta] = useField(props);

    return (
        <div className="floating-label-form__field">
            <TextBox
                type={props.type ?? "text"}
                placeholder={props.placeholder ?? props.label}
                className="floating-label-form__text-box"
                {...field}
            />
            <label className="floating-label-form__label">{props.label}</label>
            {meta.touched && meta.error ? (
                <div className="floating-label-form__error-message">{meta.error}</div>
            ) : null}
        </div>
    );
};
