import React from "react";
import "./OfflineNotification.scss";

export const OfflineNotification = (): JSX.Element => {
    return (
        <div className="offline-notification">
            Вы оффлайн. Можно поиграть, но результаты не будут сохранены в лидерборд.
        </div>
    );
};
