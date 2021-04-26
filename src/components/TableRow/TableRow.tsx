import React from "react";
import "./TableRow.scss";
import {LeaderBoardProps} from "../Pages/types";
import avatar from "../../assets/circle.png";

type userDataProps = {
    userData: LeaderBoardProps
};

export const TableRow = (props: userDataProps) => {
    const { id, name, theme, score } = props.userData;

    return (    <tr className="table-wrapper__line">
        <td className="tablerow">{id}</td>
        <td className="tablerow" align="left">
            <a target="_blank" className="tablerow__link">
                <img className="tablerow__img" src={avatar}
                    width="50" height="50" alt="Image not found"/>
                <span className="tablerow__name">{name}</span>
            </a>
        </td>
        <td className="tablerow">{theme}</td>
        <td className="tablerow">{score}</td>
    </tr>);
};
