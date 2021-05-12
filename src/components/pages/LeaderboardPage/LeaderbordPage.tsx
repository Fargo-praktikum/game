import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeaderboardTable from "../../LeaderboardTable";
import "./LeaderboardPage.scss";

import LeaderboardApi from "../../../api/leaderboardApi";
import ScoreData from "../../../models/scoreData";
import { Link } from "react-router-dom";
import { cardsData } from "../../../game/cardsData/cardsData";
import store from "../../../scripts/redux/store";
import { UserScore } from "../../../models/userScore";

export const LeaderboardPage = (): JSX.Element => {
    const [usersScore, setUsersScore] = useState<{ data: ScoreData}[]>([]);

    const leaderboard = new LeaderboardApi();
    const { currentTheme } = useParams<{ currentTheme: string }>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await leaderboard.getLeaderboard();
                let scoresByTheme;

                if(typeof currentTheme === "undefined"){
                    scoresByTheme = [...result];
                    scoresByTheme.forEach((el: any) => {
                        el.data.theme = currentTheme;
                        el.data.score = Object.keys(el.data.themes).reduce((sum, key) => {
                            return sum + parseInt(el.data.themes[key].score);
                        }, 0);
                        delete el.data.themes;
                    });
                } else {
                    scoresByTheme = result.filter(el => typeof el.data.themes[currentTheme] !== "undefined");
                    scoresByTheme.forEach((el: any) => {
                        el.data.theme = currentTheme;
                        el.data.score = el.data.themes[currentTheme].score;
                        delete el.data.themes;
                    });
                }

                const leaderboardScore: any = [...scoresByTheme];
                leaderboardScore.sort((a: {data: UserScore},b: {data: UserScore}) => b.data.score - a.data.score);
                setUsersScore(scoresByTheme);
            } catch(err) {
                // error handling code
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <div className="leaderboard">
                <div className="leaderboard__header">
                    Рейтинг
                </div>
                <div className="leaderboard__subheader">
                    Пользователь: {store.getState().auth.userInfo.firstName}. {typeof currentTheme !== "undefined" ? `Тема: ${cardsData[currentTheme].themeName}` : "Количество очков за все игры"}
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
        </>
    );
};

