import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../hooks/authHook";

export const PrivateRoute = (props: RouteProps): JSX.Element => {

    const user = useAuth();

    if (!user) {
        return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
        <Route {...props}/>
    );
};
