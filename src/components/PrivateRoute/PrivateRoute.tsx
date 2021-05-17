import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHooks";

export const PrivateRoute = (props: RouteProps): JSX.Element => {

    const userId = useAppSelector(
        (state) => {
            return state.auth?.userInfo?.id;
        }
    );

    if (!userId) return <Redirect to={{ pathname: "/login" }} />;

    return (
        <Route {...props}/>
    );
};
