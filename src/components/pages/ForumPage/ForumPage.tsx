import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import "./Forum.scss";

import ForumHeader from "../../Forum/ForumHeader/ForumHeader";
import TopicsList from "../../Forum/TopicsList/TopicsList";
import { PopupboxContainer } from "../../common/PopupConstructor/PopupboxContainer";

import { getTopics } from "../../../store/forumReducer";
import { useAppDispatch } from "../../../hooks/storeHooks";
import Topic from "../../Forum/Topic/Topic";

const ForumPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTopics());
    }, []);


    return (
        <div className="forum__general">
            <ForumHeader/>

            <Route exact path="/forum/:topicId" render={() => <Topic/>}/>
            <Route exact path="/forum/" render={() => <TopicsList/>}/>

            <PopupboxContainer/>
        </div>
    );
};

export default ForumPage;
