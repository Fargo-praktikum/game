import React from "react";
import { TTextBoxProps } from "./types";

import "./TextBox.scss";

export const TextBox = (props: TTextBoxProps) => {

    const cssClasses = React.useMemo(() => {
        return `text-box ${props.className}`;
    }, [props.className]);

    return (
        <input
            {...props}
            className={cssClasses}
        />
    );
}
