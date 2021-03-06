import React from "react";
import { useAppSelector } from "../../../hooks/storeHooks";
import { TRootState } from "../../../store/store";

import "./ForumHeader.scss";

const createName = (firstName: string | null, secondName: string | null) => {
    return (firstName && secondName) ? `${firstName[0]}${secondName[0]}` : "";
};

const redirectToUserPage = () => {
    console.log("Редирект на страницу пользователя");
};

const ForumHeader = (): JSX.Element => {
    const userInfo = useAppSelector((state: TRootState) => state.auth.userInfo);
    const { firstName = null, secondName = null } = { ...userInfo };

    return (
        <header className="f-header">
            <h1 className="f-header__title">Платформа tinyCards</h1>
            <div className="f-header__user-container">
                <button className="f-header__user-button"
                    onClick={redirectToUserPage}
                >{createName(firstName, secondName)}</button>
            </div>
        </header>
    );
};

export default ForumHeader;
