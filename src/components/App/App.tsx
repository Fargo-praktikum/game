import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {LeaderBoardPage} from "../Pages/LeaderBordPage";

import "./App.scss";

class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route component={LeaderBoardPage} path='/leaderboard' />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;
