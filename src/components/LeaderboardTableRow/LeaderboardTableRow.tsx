import React from "react";
import "./LeaderboardTableRow.scss";
import avatar from "../../assets/circle.png";
import { UserScore } from "../../models/userScore";

interface LeaderBoardTableRowProps {
    userData: UserScore;
}

export const LeaderboardTableRow = (props: LeaderBoardTableRowProps): JSX.Element => {
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
