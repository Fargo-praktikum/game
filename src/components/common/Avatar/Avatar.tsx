import React, { Fragment } from "react";

import "./Avatar.scss";

import noPhoto from "../../../assets/noPhoto.png";

type AvatarType = {
    avatarSrc?: string
};


const Avatar: React.FC<AvatarType> = ({ avatarSrc }) => {
    console.log("обновился Avatar");
    return (
        <Fragment>
            {!avatarSrc &&
            <img className="avatar" src={noPhoto} alt="фото"/>
            }
            {avatarSrc &&
            <img className="avatar" src={avatarSrc} alt="фото"/>
            }
        </Fragment>
    );
};

export default Avatar;
