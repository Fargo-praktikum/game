import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LeaderboardPage from "../pages/LeaderboardPage";
import { SignupPage } from "../pages/SignupPage/SignupPage";

import "./App.scss";


class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={SignupPage} path='/signup' />
                    <Route component={LeaderboardPage} path='/leaderboard' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
