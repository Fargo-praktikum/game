import React, { memo } from "react";

import "./Message.scss";


import { getTimeInfo } from "../../../scripts/utils/timeHandler";
import Avatar from "../../common/Avatar/Avatar";
import { UserForumInfo } from "../../../store/forumReducer";

type MessageType = {
    message: string | undefined
    date: string | undefined
    user: UserForumInfo | undefined
};

const Message: React.FC<MessageType> = ({
    message, date, user
}) => {
    return (
        <div className="message__general">
            <div className="message">
                <div className="message__owner">
                    <p className="message__name">{user?.firstName} {user?.secondName}</p>
                    <div className="message__avatar">
                        <Avatar avatarSrc={user?.avatar}/>
                    </div>
                </div>
                <div className="message__info">
                    <p className="message__date">{getTimeInfo(date)}</p>
                    <p className="message__description">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default memo(Message);
