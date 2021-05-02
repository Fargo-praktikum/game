import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Forum.scss";

import ForumHeader from "../../Forum/ForumHeader/ForumHeader";
import TopicsList from "../../Forum/TopicsList/TopicsList";
import MessagesList from "../../Forum/MessagesList/MessagesList";
import { PopupboxContainer } from "../../common/PopupConstructor/PopupboxContainer";
import MessageAndComments from "../../Forum/MessageAndComments/MessageAndComments";

import { ITopic, setTopicsList } from "../../../scripts/redux/forumReducer";

// для теста
const topicsList: ITopic[] = [
    {
        id: 1,
        title: "Глобальная тема №1",
        description: "Здесь какое-то описание этой темы",

        messages: [
            {
                id: 1,
                title: "Как пользоваться приложением",
                description: "Описание топика",
                date: "2021-04-28T19:12:00Z",
                user: {
                    id: 111,
                    firstName: "Tro",
                    secondName: "Lolo",
                    avatar: undefined,
                },
                comments: [
                    {
                        id: 1,
                        user: {
                            id: 111,
                            firstName: "Tro",
                            secondName: "Lolo",
                            avatar: undefined,
                        },
                        date: "2021-04-27T16:00:00Z",
                        message: "Первое сообщение",
                    }
                ],
            }
        ],
    },
    {
        id: 2,
        title: "Глобальная тема №2",
        description: "Здесь какое-то описание этой темы",
        messages: [
            {
                id: 1,
                title: "Как пользоваться приложением",
                description: "Описание топика",
                date: "2021-04-28T19:12:00Z",
                user: {
                    id: 111,
                    firstName: "Tro",
                    secondName: "Lolo",
                    avatar: undefined,
                },
                comments: [
                    {
                        id: 1,
                        user: {
                            id: 1,
                            firstName: "Oleg",
                            secondName: "Lolo",
                            avatar: undefined,
                        },
                        date: "2021-04-28T19:12:00Z",
                        message: "Первое сообщение в этой теме",
                    }
                ],
            },
            {
                id: 2,
                title: "Вторая тема, второй топик",
                description: "Описание топика",
                date: "2021-04-28T19:12:00Z",
                user: {
                    id: 111,
                    firstName: "Tro",
                    secondName: "Lolo",
                    avatar: undefined,
                },
                comments: [
                    {
                        id: 1,
                        user: {
                            id: 1,
                            firstName: "First",
                            secondName: "Comment",
                            avatar: undefined,
                        },
                        date: "2021-04-29T11:11:00Z",
                        message: "Первый комментарий сообщения",
                    },
                    {
                        id: 2,
                        user: {
                            id: 2,
                            firstName: "Last",
                            secondName: "Comment",
                            avatar: undefined,
                        },
                        date: "2021-04-30T11:11:00Z",
                        message: "Последний комментарий сообщения",
                    }
                ],
            }
        ],
    }
];


const ForumPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // в дальнейшем перенесем в redux-thunk
        dispatch(setTopicsList(topicsList));
    }, []);


    return (
        <div className="forum__general">
            <ForumHeader/>

            <Route exact path="/forum/:topicId/:messageId" render={() => <MessageAndComments/>}/>
            <Route exact path="/forum/:topicId" render={() => <MessagesList/>}/>
            <Route exact path='/forum' render={() => <TopicsList/>}/>

            <PopupboxContainer/>
        </div>
    );
};

export default ForumPage;
