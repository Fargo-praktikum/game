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
    // eslint-disable-next-line @typescript-eslint/ban-types
    onOpen?: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onComplete?: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onCleanUp?: Function,

    transition?: string;
    callback?: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClosed?: Function;
    children?: ReactChildren;
    style?: any;
};

// export interface IStatePopup extends defaultConfigType {
//     transition?: string;
//     callback?: NodeJS.Timeout;
//     onClosed?: Function;
//     children?: ReactChildren;
//     style?: any;
// }

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
