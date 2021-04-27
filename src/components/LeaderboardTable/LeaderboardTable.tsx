import React from "react";
import "./LeaderboardTable.scss";
import LeaderboardTableRow from "../LeaderboardTableRow";
import { LeaderboardTableProps } from "./types";

export const LeaderboardTable = (props: LeaderboardTableProps): JSX.Element => {

    const rows = props.usersScore.map((el) => {
        return <LeaderboardTableRow key={el.id} userData={el}/>;
    });

    return (
        <table className="table-wrapper">
            <tbody>
                <tr className="table-wrapper__line">
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Тема</th>
                    <th scope="col">Очки</th>
                </tr>
                {rows}
            </tbody>
        </table>
    );
};
