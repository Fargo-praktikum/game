import React, { memo, SyntheticEvent } from "react";

import "./Message.scss";

import Avatar from "../../common/Avatar/Avatar";
import UserForumInfo from "../../../models/forum/userForumInfo";
import Emoji from "../../../models/forum/emoji";
import fireSvg from "../../../assets/fire-solid.svg";
import poopSvg from "../../../assets/poop-solid.svg";

const getIcon = (name: string) => {

    name = name.replace(".svg", "");

    switch (name) {
        case "fire-solid":
            return fireSvg;
        case "poop-solid":
            return poopSvg;
        default:
            return null;
    }
};

type MessageType = {
    message: string;
    date: Date;
    user: UserForumInfo;
    id?: number;
    emojies?: Emoji[];
    // id, count
    emojiesCount?: Record<number, number>;
    emojiClickCallback?: (commentId: number, emojiId: number) => void;
    messageReplyClickCallback?: (e: SyntheticEvent, id: number) => void;
    parentId?: number | null;
};

// TODO наверное, стоило бы разбить этот компонент
// получися сильно мутным и с костылями, но пока так
const Message: React.FC<MessageType> = ({
    message, date, user, id, emojies, emojiesCount, emojiClickCallback, messageReplyClickCallback, parentId
}) => {
    return (
        <div className="message__general">
            {id &&
            <div>
                <a href={`#${id}`}># {id}</a>
            </div>}
            <div className="message">
                <div className="message__owner">
                    <p className="message__name">{user.name}</p>
                    <p className="message__name"></p>
                    <div className="message__avatar">
                        { <Avatar /> }
                    </div>
                </div>
                <div className="message__info">
                    <p className="message__date">
                        {date.toLocaleDateString()}&nbsp;
                        {parentId &&
                             <a href={`#${parentId}`}>в ответ на {parentId}</a>
                        }
                    </p>
                    <p className="message__description">{message}</p>
                </div>
                <div className="message__controls">
                    <div className="message__emojies-container">
                        {emojies &&
                        emojies.map((emoji) => {
                            return (
                                <div
                                    className="message__emoji"
                                    onClick={() => emojiClickCallback && id ? emojiClickCallback(id, emoji.id) : void(0)}
                                    key={emoji.id}
                                >
                                    <img src={getIcon(emoji.iconName)} className="message__emoji-img"/>
                                    <span className="message__emoji-count">{emojiesCount?.[emoji.id]}</span>
                                </div>
                            );
                        })
                        }
                    </div>
                    <div>
                        {messageReplyClickCallback && id &&
                            <a href="#" onClick={(e) => messageReplyClickCallback(e, id)}>Ответить</a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Message);
