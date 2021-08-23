import { ReactChildren } from "react";

export type defaultConfigType = {
    overlayOpacity: number,
    show: boolean,
    fadeIn: boolean,
    fadeInSpeed: number,
    fadeOut: boolean,
    fadeOutSpeed: number,
    overlayClose: boolean,
    escClose: boolean,
    closeBtn: boolean,
    padding: boolean,
    content: { [key in string]: any },
    onOpen?: (...args: unknown[]) => void,
    onComplete?: (...args: unknown[]) => void,
    onCleanUp?: (...args: unknown[]) => void,

    transition?: string;
    callback?: any;
    onClosed?: (...args: unknown[]) => void;
    children?: ReactChildren;
    style?: any;
};

export type getConfigType = {
    params: Partial<defaultConfigType>
    isInit: boolean
};

export type handleStoreChangeType = {
    children: ReactChildren,
    show: boolean;
    config: Partial<defaultConfigType>;
};

export type ListenerType = { (params: any): void; (...args: any[]): void; };
