import React from "react";
import ProfileNonePhoto from "../../../assets/profileNonePhoto.svg";
import ProfileNonePhotoHover from "../../../assets/profileNonePhotoHover.svg";

import "../ProfileForm/ProfileForm.scss";
import "./ProfileView.scss";
import { useSelector } from "react-redux";
import { ProfileViewField } from "../ProfileViewField";
import User from "../../../models/user";
import { Link } from "react-router-dom";

export const ProfileView = (): JSX.Element => {

    //TODO типизировать, когда появится типизированный стор
    const userInfo = useSelector<{ auth: { userInfo: User } }, User>((state): User => state.auth.userInfo );

    return (
        <div className="registration__block">
            <div className="wraper">
                <div className="profile-image">
                    <img className="profile-svg" src={ userInfo.avatar ?? ProfileNonePhoto } alt="Аватар"/>
                    <img className="profile-svg-change" src={ProfileNonePhotoHover} alt="Поменять аватар"/>
                </div>
                <div className="floating-label-form__fields-block">
                    <ProfileViewField
                        label="Email"
                        placeholder={userInfo.email}
                    />
                    <ProfileViewField
                        label="Логин"
                        placeholder={userInfo.login}
                    />
                    <ProfileViewField
                        label="Имя"
                        placeholder={userInfo.firstName}
                    />
                    <ProfileViewField
                        label="Фамилия"
                        placeholder={userInfo.secondName}
                    />
                    <ProfileViewField
                        label="Имя в чате"
                        placeholder={userInfo.displayName}
                    />
                    <ProfileViewField
                        label="Телефон"
                        placeholder={userInfo.phone}
                    />
                </div>
                <div className="form__field">
                    <Link to="/" className="link">
                        Изменить данные
                    </Link>
                </div>
                <div className="form__field">
                    <Link to="/" className="link">
                        Изменить пароль
                    </Link>
                </div>
                <div className="form__field">
                    <Link to="/" className="link red">
                        На главную
                    </Link>
                </div>
            </div>
        </div>
    );
};
