import React from "react";
import "./LeaderboardTable.scss";
import LeaderboardTableRow from "../LeaderboardTableRow";
import { UserScore } from "../../models/userScore";
import { LeaderboardTableProps } from "./types";

export const LeaderboardTable = (props: LeaderboardTableProps): JSX.Element => {
    const rows = props.usersScore.map((el: { data: UserScore }, i: number) => {
        const userData = { ...el.data, rating: i + 1 };
        return <LeaderboardTableRow key={el.data.date} userData={userData}/>;
    });

    return (
        <table className="table-wrapper">
            <tbody>
                <tr className="table-wrapper__line">
                    <th className="table-wrapper__scoreNumber" scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Очки</th>
                </tr>
                {rows}
            </tbody>
        </table>
    );
};
