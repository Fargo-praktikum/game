import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/authHook";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { oauthYndexSignIn } from "../../../store/authReducer";

import "./MainPage.scss";
import { DropdownMenu } from "../../DropdownMenu/DropdownMenu";
import {ThemeType} from "../../../store/gameReducer";


export const MainPage = (): JSX.Element => {

    const queryString = new URLSearchParams(useLocation().search);
    const code = queryString.get("code");
    const dispatch = useAppDispatch();
    const user = useAuth();

    const ThemeOptions: {id: number, label: ThemeType}[] = [
        { id: 1, label: "STARS" },
        { id: 2, label: "BASIC" }
    ];


    useEffect(() => {
        if (code && !user) {
            dispatch(oauthYndexSignIn(code));
        }
    });

    return (
        <main className="page page_centered">
            <div className="main-page__select">
                <h2 className="main-page__select-title">Тема игрового поля</h2>
                <DropdownMenu data={ThemeOptions}/>
            </div>
            <div className="main-page__links">
                <Link to="/signup" className="main-page__link">
                    Регистрация
                </Link>
                <Link to="/login" className="main-page__link">
                    Вход
                </Link>
                <Link to="/profile" className="main-page__link">
                    Профиль
                </Link>
                <Link to="/game" className="main-page__link">
                    Игра
                </Link>
                <Link to="/leaderboard" className="main-page__link">
                    Доска почета
                </Link>
                <Link to="/forum" className="main-page__link">
                    Форум
                </Link>
            </div>
        </main>
    );
};

