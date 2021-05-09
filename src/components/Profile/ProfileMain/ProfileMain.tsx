import React, { MouseEvent, useCallback } from "react";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";

import "../Profile.scss";
import { ProfileMainField } from "../ProfileMainField";
import User from "../../../models/user";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { logout } from "../../../services/authService";
import { useAppSelector } from "../../../hooks/storeHooks";

export const ProfileMain = (): JSX.Element => {

    const { url } = useRouteMatch();
    const history = useHistory();

    const userInfo = useAppSelector((state): User | null => state.auth.userInfo);
    if (!userInfo) {
        throw new Error("User is undefined");
    }

    const handleLogoutClick = useCallback(async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        await logout();
        history.push("/login");
    }, []);

    return (
        <div className="profile__block">
            <div className="profile__wrapper">
                <div className="profile__image">
                    <img className="profile__avatar"
                        src={ userInfo?.avatar? `https://ya-praktikum.tech/api/v2/resources${userInfo.avatar}` : ProfileNonePhoto }
                        alt="Аватар"/>
                </div>
                <div className="floating-label-form__fields-block">
                    <ProfileMainField
                        label="Email"
                        placeholder={userInfo.email}
                    />
                    <ProfileMainField
                        label="Логин"
                        placeholder={userInfo.login}
                    />
                    <ProfileMainField
                        label="Имя"
                        placeholder={userInfo.firstName}
                    />
                    <ProfileMainField
                        label="Фамилия"
                        placeholder={userInfo.secondName}
                    />
                    <ProfileMainField
                        label="Имя в чате"
                        placeholder={userInfo.displayName}
                    />
                    <ProfileMainField
                        label="Телефон"
                        placeholder={userInfo.phone}
                    />
                </div>
                <div className="form__field">
                    <Link to={`${url}/change`} className="link">
                        Изменить данные
                    </Link>
                </div>
                <div className="form__field">
                    <Link to={`${url}/change_password`} className="link">
                        Изменить пароль
                    </Link>
                </div>
                <div className="form__field">
                    <a className="link red" href="#" onClick={handleLogoutClick}>
                        Выйти
                    </a>
                </div>
            </div>
        </div>
    );
};
