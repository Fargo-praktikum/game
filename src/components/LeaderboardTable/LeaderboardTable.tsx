import React from "react";
import "./LeaderboardTable.scss";
import { LeaderboardTableRow } from "../LeaderboardTableRow/LeaderboardTableRow";
import { UserScore } from "../../models/userScore";

interface LeaderBoardTableProps {
    usersScore: UserScore[];
}

export const LeaderboardTable = (props: LeaderBoardTableProps) => {

    const rows = props.usersScore.map((el, i) => {
        return <LeaderboardTableRow key={i} userData={el}/>;
    });

    return ( <table className="table-wrapper">
        <tbody>
            <tr className="table-wrapper__line">
                <th scope="col">#</th>
                <th scope="col">Имя</th>
                <th scope="col">Тема</th>
                <th scope="col">Очки</th>
            </tr>
            {rows}
        </tbody>
    </table>);
};
