import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../assets/vendor/normalize.scss";
import "./App.scss";

import LeaderboardPage from "../pages/LeaderboardPage";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrivateRoute } from "../PrivateRoute";
import { GamePage } from "../pages/GamePage";
import ForumPage from "../pages/ForumPage/ForumPage";


class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <div>main</div>}/>
                    <Route path="/signup" render={() => <SignupPage />}/>
                    <Route path="/login" render={() => <div>login</div>}/>
                    <PrivateRoute path="/forum" render={() => <ForumPage/>}/>
                    <PrivateRoute path="/profile" render={() => <div>profile</div>}/>
                    <PrivateRoute path="/leaderboard" render={() => <LeaderboardPage />}/>
                    <PrivateRoute path="/game" render={() => <GamePage />}/>
                    <Route path="*" render={() => <NotFoundPage />}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
