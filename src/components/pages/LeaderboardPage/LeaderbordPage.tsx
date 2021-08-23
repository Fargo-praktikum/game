import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeaderboardTable from "../../LeaderboardTable";
import "./LeaderboardPage.scss";

import { cardsData } from "../../../game/cardsData/cardsData";
import { TRootState } from "../../../store/store";
import { useAppSelector } from "../../../hooks/storeHooks";
import { getLeaderboardData } from "../../../services/leaderboardService";
import ScoreRequestData from "../../../models/scoreRequestData";
import { SidebarProfile } from "../../Profile/SidebarProfile/SidebarProfile";
import { getUserById } from "../../../services/getUserById";

export const LeaderboardPage = (): JSX.Element => {
    const [usersScore, setUsersScore] = useState<ScoreRequestData[]>([]);

    const userInfo = useAppSelector((state: TRootState) => state.auth.userInfo);

    const { currentTheme } = useParams<{ currentTheme: string }>();

    useEffect(() => {
        getLeaderboardData(currentTheme).then(async leaderboardScore => {
            setUsersScore(leaderboardScore);
            await getAvatars(leaderboardScore);
        });

        const getAvatars = async (usersScore: ScoreRequestData[]) => {
            const newLeaderboardAvatars: ScoreRequestData[] = await Promise.all(usersScore.map(async (el: ScoreRequestData) => {
                const userAvatar = await getUserById(el.data.userId) ;
                el.data.avatar = userAvatar.avatar;
                return el;
            }));
            setUsersScore(newLeaderboardAvatars);
        };


    }, []);

    return (
        <div className="leaderboard__wrapper">
            <SidebarProfile/>
            <div className="leaderboard">
                <div className="leaderboard__header">
                    Рейтинг
                </div>
                <div className="leaderboard__subheader">
                    Пользователь: {userInfo ? userInfo.firstName : ""}. {typeof currentTheme !== "undefined" ? `Тема: ${cardsData[currentTheme].themeName}` : "Количество очков за все игры"}
                </div>
                <LeaderboardTable usersScore={usersScore}/>
            </div>
        </div>

    );
};

