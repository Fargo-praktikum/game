import React from "react";
import { Switch, Route } from "react-router-dom";
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

export const App = (): JSX.Element => {

    const isOnline = useAppSelector((state) => {
        return state.app.isOnline;
    });

    let bck;
    const mainTheme = useAppSelector((state): any | null => state.game.theme);
    if (mainTheme === "STARS") {
        bck = `url(${stars as string})`;
    } else {
        bck = `url(${quizPattern as string})`;
    }

    return (
        <div className="mainTheme" style={{ backgroundImage: bck }}>
            { !isOnline && <OfflineNotification /> }
            <ErrorBoundary>
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/login">
                        <SigninPage />
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <PrivateRoute path="/game">
                        <GamePage />
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <ProfilePage />
                    </PrivateRoute>
                    <PrivateRoute path="/leaderboard/:currentTheme?">
                        <LeaderboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/forum">
                        <ForumPage />
                    </PrivateRoute>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </ErrorBoundary>
        </div>
    );
};

export default App;
