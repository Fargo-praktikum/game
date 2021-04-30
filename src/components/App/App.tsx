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
                    <Route component={Forum} path="/forum"/>

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
                    {/*<PrivateRoute path="/forum">*/}
                    {/*    <div>forum</div>*/}
                    {/*</PrivateRoute>*/}
                    <PrivateRoute path="/game">
                        <div>game</div>
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
