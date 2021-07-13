import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LeaderboardPage from "../pages/LeaderboardPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { PrivateRoute } from "../PrivateRoute";
import { GamePage } from "../pages/GamePage";

import "./App.scss";
import "../../styles/normalize.scss";
import ForumPage from "../pages/ForumPage/ForumPage";
import { SigninPage } from "../pages/SigninPage/SigninPage";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { MainPage } from "../pages/MainPage";
import { useAppSelector } from "../../hooks/storeHooks";
import { OfflineNotification } from "../OfflineNotification";
import quizPattern from "../../assets/quiz-pattern.png";
import stars from "../../assets/stars.png";
import { ThemeType } from "../../store/gameReducer";


const setThemeBgImage = (mainTheme: ThemeType) => {
    let backgroundImageTheme = `url(${quizPattern as string})`;

    if (mainTheme === "STARS") backgroundImageTheme = `url(${stars as string})`;
    else if (mainTheme === "BASIC") backgroundImageTheme = `url(${quizPattern as string})`;

    return backgroundImageTheme;
};


export const App = (): JSX.Element => {
    const history = useHistory();
    const isOnline = useAppSelector((state) => {
        return state.app.isOnline;
    });
    const mainTheme = useAppSelector((state) => state.game.theme);
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
    }, []);

    return (
        <div className="mainTheme" style={{ backgroundImage: setThemeBgImage(mainTheme) }}>
            {!isOnline && <OfflineNotification/>}
            <ErrorBoundary>
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                    <Route path="/login">
                        <SigninPage/>
                    </Route>
                    <Route path="/signup">
                        <SignupPage/>
                    </Route>
                    <PrivateRoute path="/game">
                        <GamePage/>
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <ProfilePage/>
                    </PrivateRoute>
                    <PrivateRoute path="/leaderboard/:currentTheme?">
                        <LeaderboardPage/>
                    </PrivateRoute>
                    <PrivateRoute path="/forum">
                        <ForumPage/>
                    </PrivateRoute>
                    <Route>
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </ErrorBoundary>
        </div>
    );
};

export default App;
