import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../assets/vendor/normalize.scss";
import "./App.scss";

import LeaderboardPage from "../Pages/LeaderboardPage";
import { SignupPage } from "../Pages/SignupPage/SignupPage";
import Forum from "../Forum/Forum";



class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={SignupPage} path='/signup' />
                    <Route component={LeaderboardPage} path='/leaderboard' />
                    <Route component={Forum} path='/forum'/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
