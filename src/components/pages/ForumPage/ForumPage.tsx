import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import "./Forum.scss";

import ForumHeader from "../../Forum/ForumHeader/ForumHeader";
import TopicsList from "../../Forum/TopicsList/TopicsList";
import { PopupboxContainer } from "../../common/PopupConstructor/PopupboxContainer";

import { getTopics } from "../../../store/forumReducer";
import { useAppDispatch } from "../../../hooks/storeHooks";
import Topic from "../../Forum/Topic/Topic";

const ForumPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { path } = useRouteMatch();

    useEffect(() => {
        dispatch(getTopics());
    }, []);


    return (
        <div className="forum__general">
            <ForumHeader/>

            <Switch>
                <Route exact path={path}>
                    <TopicsList/>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic/>
                </Route>
            </Switch>

            <PopupboxContainer/>
        </div>
    );
};

export default ForumPage;
