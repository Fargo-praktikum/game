import React, {MouseEventHandler} from "react";
import "./CoolButton.scss";

type CoolButtonType = {
    clickHandler: MouseEventHandler,
    text: string,
    isDisabled?: boolean,
}

const CoolButton = ({clickHandler, text, isDisabled}: CoolButtonType) => {

  return (
    <button className="cool-button"
            disabled={isDisabled}
            onClick={clickHandler}
    >
      <span>{text}</span>
    </button>
  );
};

export default CoolButton;
