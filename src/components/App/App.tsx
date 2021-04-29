import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LeaderboardPage from "../Pages/LeaderboardPage";
import StartPage from "../Pages/StartPage";

import "./App.scss";


class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={LeaderboardPage} path='/leaderboard' />
                    <Route component={StartPage} path='/' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
