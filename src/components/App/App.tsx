import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";

import LeaderboardPage from "../Pages/LeaderboardPage";
import Forum from "../Forum/Forum";


class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={LeaderboardPage} path='/leaderboard'/>
                    <Route component={Forum} path='/forum'/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
