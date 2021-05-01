import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const PrivateRoute = (props: RouteProps): JSX.Element => {

    //TODO типизировать, когда появится типизированный стор
    const userId = useSelector<{ auth: any }>(
        (state) => {
            return state.auth?.userInfo?.id;
        }
    );

    if (!userId) return <Redirect to={{ pathname: "/login" }} />;

    return (
        <Route {...props}/>
    );
};
