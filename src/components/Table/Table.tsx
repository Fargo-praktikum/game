import React from "react";
import "./Table.scss";
import {TableRow} from "../TableRow/TableRow";
import {LeaderBoardProps} from "../Pages/types";

type UsersScoreProps = {
    usersScore: LeaderBoardProps[]
};

export const Table = (props: UsersScoreProps) => {

    const rows = props.usersScore.map((el, i) => {
        return <TableRow key={i} userData={el}/>;
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
