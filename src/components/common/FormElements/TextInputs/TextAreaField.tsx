import React from "react";

import "./TextInputs.scss";
import { FieldProps } from "formik";

type OwnProps = FieldProps<string, any>;
// FIXME: Так линтер не пропускает, наверное стоит отплючить это правило
// export const TextAreaField: React.FC<OwnProps> = ({ field, form, meta, ...props }) => {
export const TextAreaField = ({ field, form, meta, ...props }: Partial<OwnProps>): JSX.Element => {
    const name  = field?.name || "_test";
    const hasError = form?.touched[name] && form.errors[name];

    return (
        <div className={`formControl ${hasError ? "errorInput" : ""}`}>
            <textarea className="textField"
                {...field} {...props} />
            <div className="errorContainer">
                {hasError && (
                    <span className="error">{form?.errors[name]}</span>
                )}
            </div>

        </div>
    );
};


