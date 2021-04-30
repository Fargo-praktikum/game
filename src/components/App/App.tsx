import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LeaderboardPage from "../Pages/LeaderboardPage";
import { NotFoundPage } from "../Pages/NotFoundPage";
import { SignupPage } from "../Pages/SignupPage/SignupPage";
import { PrivateRoute } from "../PrivateRoute";
import { GamePage } from "../Pages/GamePage";

import "./App.scss";

class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <div>main</div>
                    </Route>
                    <Route path="/login">
                        <div>login</div>
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <PrivateRoute path="/profile">
                        <div>profile</div>
                    </PrivateRoute>
                    <PrivateRoute path="/leaderboard">
                        <LeaderboardPage />
                    </PrivateRoute>
                    <PrivateRoute path="/forum">
                        <div>forum</div>
                    </PrivateRoute>
                    <PrivateRoute path="/game">
                        <GamePage />
                    </PrivateRoute>
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
