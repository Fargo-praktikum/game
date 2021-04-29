import React, {MouseEventHandler} from "react";
import "./CoolButton.scss";

type CoolButtonType = {
    text: string;
    isDisabled?: boolean;
    type?: "submit" | "reset" | "button";
    clickHandler?: MouseEventHandler;
}

const CoolButton = ({clickHandler, text, isDisabled, type}: CoolButtonType) => {

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

export default CoolButton;
