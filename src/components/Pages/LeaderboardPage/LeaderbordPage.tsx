import React, { useState } from "react";
import LeaderboardTable from "../../LeaderboardTable";
import "./LeaderboardPage.scss";
import { UserScore } from "../../../models/userScore";

export const LeaderboardPage = (): JSX.Element => {
    const [usersScore] = useState<UserScore[]>([{
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
        <>
            <div className="leaderboard">
                <div className="leaderboard__header">
                    Рейтинг
                </div>
                <LeaderboardTable usersScore={usersScore}/>
            </div>
        </>
    );
};
