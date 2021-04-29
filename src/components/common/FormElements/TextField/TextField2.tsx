import React from 'react';

import "./TextField.scss";
import {FieldProps} from "formik";

type OwnProps = FieldProps<string, any>;
export const TextField2: React.FC<OwnProps> = ({field, form, meta, ...props}) => {
    const {name} = field;

    return (
        <div>
            <input {...field} {...props} />
            {form.touched[name] && form.errors[name] && (
                <div className="error">{meta.error}</div>
            )}
        </div>
    );
};


