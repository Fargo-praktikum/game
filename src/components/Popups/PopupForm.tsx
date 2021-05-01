import React from "react";

import "./PopupForm.scss";


type PopupFormType = {
    title: string,
    form?: JSX.Element,
};

const PopupForm = ({ title, form }: PopupFormType): JSX.Element => {
    return (
        <div className="popupform__common">
            <h1 className="popupform__title">{title}</h1>
            <div className="popupform__footer">
                {form}
            </div>
        </div>
    );
};

export default PopupForm;
