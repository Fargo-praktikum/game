import React from "react";
import { TButtonProps } from "./types";

import "./Button.scss";

export const Button = (props: TButtonProps): JSX.Element => {

    const cssClasses = React.useMemo(() => {
        return `button ${props.className ?? ""}`;
    }, [props.className]);

    return (
        <button {...props} className={cssClasses}>
        </button>
    );
};
