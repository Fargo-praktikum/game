import React, {useState } from "react";
import {Table} from "../Table/Table";
import "./LeaderBoardPage.scss";
import "./types";
import {ILeaderBoard} from "./types";

export const LeaderBoardPage: React.FC = () => {
    const [usersScore] = useState<ILeaderBoard[]>([{
        id: 1,
        name: "Катя",
        theme: "Страны",
        score: 321
    }, {
        id: 2,
        name: "Иван",
        theme: "Английский",
        score: 123
    }]);

    return (
        <div className="leaderboard-wrapper">
            <div className="main-header">
        Рейтинг
            </div>
            <div className="leaderboard">
                <div className="table-wrap">
                    <Table usersScore={usersScore}/>
                </div>
            </div>
        </div>
    );
};
