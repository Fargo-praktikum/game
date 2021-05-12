import React from "react";
import "./LeaderboardTableRow.scss";
import avatar from "../../assets/circle.png";
import { LeaderboardTableRowProps } from "./types";
import gold from "../../assets/gold-medal.svg";
import silver from "../../assets/silver-medal.svg";
import bronze from "../../assets/bronze-medal.svg";

export const LeaderboardTableRow = (props: LeaderboardTableRowProps): JSX.Element => {

    const { id, name, date, score } = props.userData;

    function renderScoreNumber(id: number){
        switch (id) {
            case 1:
                return <td className="tablerow"><img src={gold} className="tablerow__img" alt="1 place"/></td>;
            case 2:
                return <td className="tablerow"><img src={silver} className="tablerow__img" alt="1 place"/></td>;
            case 3:
                return <td className="tablerow"><img src={bronze} className="tablerow__img" alt="1 place"/></td>;
            default:
                return <td className="tablerow"><span className="tablerow__scoreNumber">{id}</span></td>;
        }
    }

    return (    <tr className="table-wrapper__line">
        {renderScoreNumber(id)}
        <td className="tablerow" align="left">
            <a target="_blank" className="tablerow__link">
                <img className="tablerow__img" src={avatar}
                    width="50" height="50" alt="Image not found"/>
                <span className="tablerow__name">{name}</span>
            </a>
        </td>
        <td className="tablerow">{new Date(date).toLocaleDateString("en-gb")}</td>
        <td className="tablerow">{score}</td>
    </tr>);
};
