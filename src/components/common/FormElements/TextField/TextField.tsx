import React from 'react';

import "./TextField.scss";


export const TextField = ({touched, error, ...restProps}: any) => {
    const hasError = touched && error;

    return (
        <div className={`formControl ${hasError ? 'errorInput' : ''}`}>
            <input className="text-field"
                {...restProps} />
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    );

};


