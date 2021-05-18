import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeaderboardTable from "../../LeaderboardTable";
import "./LeaderboardPage.scss";

import ScoreData from "../../../models/scoreData";
import { Link } from "react-router-dom";
import { cardsData } from "../../../game/cardsData/cardsData";
import { TRootState } from "../../../store/store";
import { useAppSelector } from "../../../hooks/storeHooks";
import { getLeaderboardData } from "../../../services/leaderboardService";

export const LeaderboardPage = (): JSX.Element => {
    const [usersScore, setUsersScore] = useState<{ data: ScoreData}[]>([]);

    const userInfo = useAppSelector((state: TRootState) => state.auth.userInfo);

    const { currentTheme } = useParams<{ currentTheme: string }>();

    useEffect(() => {
        getLeaderboardData(currentTheme).then(leaderboardScore => setUsersScore(leaderboardScore));
    }, []);

    return (
        <div className="leaderboard">
            <div className="leaderboard__header">
                Рейтинг
            </div>
            <div className="leaderboard__subheader">
                Пользователь: {userInfo ? userInfo.firstName : ""}. {typeof currentTheme !== "undefined" ? `Тема: ${cardsData[currentTheme].themeName}` : "Количество очков за все игры"}
            </div>
            <LeaderboardTable usersScore={usersScore}/>
            <div className="navigate">
                <Link to="/" className="navigate__link link">
                    На главную
                </Link>
                <Link to="/game" className="navigate__link link">
                    К игре
                </Link>
            </div>
        </div>
    );
};

