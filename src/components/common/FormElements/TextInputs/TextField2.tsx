import React from 'react';

import "./TextInputs.scss";
import {FieldProps} from "formik";

type OwnProps = FieldProps<string, any>;
export const TextField2: React.FC<OwnProps> = ({field, form, meta, ...props}) => {
    const {name} = field;
    const hasError = form.touched[name] && form.errors[name];

    return (
        <div className={`formControl ${hasError ? 'errorInput' : ''}`}>
            <input className="textField"
                {...field} {...props} />
            <div className="errorContainer">
                {hasError && (
                    <span className="error">{form.errors[name]}</span>
                )}
            </div>

        </div>
    );
};


