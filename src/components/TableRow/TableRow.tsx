import React from "react";
import "./TableRow.scss";
import {ILeaderBoard} from "../Pages/types";

type userDataProps = {
    userData: ILeaderBoard
};

export const TableRow: React.FC<userDataProps> = (props) => {

    return (    <tr>
        <td>{props.userData.id}</td>
        <td align="left">
            <a target="_blank" className="tablerow__link">
                <img className="tablerow__img" src="https://bit.ly/3gFcgoO"
                    width="50" height="50" alt="Image not found"/>
                <span className="tablerow__name">{props.userData.name}</span>
            </a>
        </td>
        <td>{props.userData.theme}</td>
        <td>{props.userData.score}</td>
    </tr>);
};
