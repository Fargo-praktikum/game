import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../assets/vendor/normalize.scss";
import "./App.scss";

import LeaderboardPage from "../Pages/LeaderboardPage";
import { SignupPage } from "../Pages/SignupPage/SignupPage";
import { NotFoundPage } from "../Pages/NotFoundPage";
import { PrivateRoute } from "../PrivateRoute";
import Forum from "../Forum/Forum";


class App extends Component {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <div>main</div>}/>
                    <Route path="/signup" render={() => <SignupPage />}/>
                    <Route path="/login" render={() => <div>login</div>}/>
                    <Route path="/forum" render={() => <Forum/>}/>
                    <PrivateRoute path="/profile" render={() => <div>profile</div>}/>
                    <PrivateRoute path="/leaderboard" render={() => <LeaderboardPage />}/>
                    <PrivateRoute path="/game" render={() => <div>game</div>}/>
                    <Route path="*" render={() => <NotFoundPage />}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
