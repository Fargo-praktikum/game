import React, { memo, MouseEventHandler } from "react";
import "./CoolButton.scss";

type CoolButtonType = {
    text: string;
    isDisabled?: boolean;
    type?: "submit" | "reset" | "button";
    clickHandler?: MouseEventHandler;
};

const CoolButton: React.FC<CoolButtonType> = ({ clickHandler, text, isDisabled, type }) => {
    return (
        <button className="cool-button"
            disabled={isDisabled}
            onClick={clickHandler}
            type={type}
        >
            <span>{text}</span>
        </button>
    );
};

export default memo(CoolButton, (prevProps, nextProps) => {
    let equal = true;
    if (prevProps.isDisabled !== nextProps.isDisabled) equal = false;

    return equal;
});
