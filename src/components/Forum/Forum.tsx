import React, { useEffect } from "react";

import "./Forum.scss";
import ForumHeader from "./ForumHeader/ForumHeader";
import { useDispatch } from "react-redux";
import { setUserInfoAC } from "../../scripts/redux/authReducer";
import { setForumList } from "../../scripts/redux/forumReducer";
import ForumList from "./ForumList/ForumList";

// для теста
const userInfo = {
    id: 111,
    login: "trololo",
    displayName: "trololo111",
    firstName: "tro",
    secondName: "lolo",
    email: "tro@gmail.com",
    avatar: null,
    phone: "+79161234567",
};

// для теста
const forumList = [
    {
        title: "Глобальная тема №1",
        description: "Здесь какое-то описание этой темы",
        topics: [
            {
                id: 1,
                title: "Как пользоваться приложением",
                description: "Описание топика",
                comments: [
                    {
                        user: {
                            id: 111,
                            firstName: "Tro",
                            secondName: "Lolo",
                            avatar: null,
                        },
                        date: "2021-04-27T16:00:00Z",
                        message: "Первое сообщение",
                    }
                ],
            }
        ],
    },
    {
        title: "Глобальная тема №2",
        description: "Здесь какое-то описание этой темы",
        topics: [
            {
                id: 2,
                title: "Как пользоваться приложением",
                description: "Описание топика",
                comments: [
                    {
                        user: {
                            id: 1,
                            firstName: "Oleg",
                            secondName: "Lolo",
                            avatar: null,
                        },
                        date: "2021-04-28T19:12:00Z",
                        message: "Первое сообщение в этой теме",
                    }
                ],
            },
            {
                id: 3,
                title: "Вторая тема, второй топик",
                description: "Описание топика",
                comments: [
                    {
                        user: {
                            id: 1,
                            firstName: "Last",
                            secondName: "Comment",
                            avatar: null,
                        },
                        date: "2021-04-29T11:11:00Z",
                        message: "Последнее сообщение в этом топике",
                    }
                ],
            }
        ],
    }
];


const Forum = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // в дальнейшем перенесем в redux-thunk
        dispatch(setUserInfoAC(userInfo));
        dispatch(setForumList(forumList));
    }, []);

    return (
        <div className="forum__general">
            <ForumHeader/>
            <ForumList/>
        </div>
    );
};

export default Forum;
