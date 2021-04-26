import React from "react";
import "./Table.scss";
import {TableRow} from "../TableRow/TableRow";
import {ILeaderBoard} from "../Pages/types";

type LeaderBoardProps = {
    usersScore: ILeaderBoard[]
};

export const Table: React.FC<LeaderBoardProps> = (props) => {

    const rows = props.usersScore.map((el, i) => {
        return <TableRow key={i} userData={el}/>;
    });

    return ( <table>
        <tbody>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Имя</th>
                <th scope="col">Тема</th>
                <th scope="col">Очки</th>
            </tr>
            {rows}
        </tbody>
    </table>);
};
