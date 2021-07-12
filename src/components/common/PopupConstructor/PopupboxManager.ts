import { EventEmitter } from "events";
import merge from "deepmerge";
import { defaultConfigType, ListenerType } from "./types";

const Constants = {
    OPEN: "open",
    CLOSE: "close",
    CHANGE: "change"
};

type openType = {
    content: JSX.Element,
    config?: Partial<defaultConfigType>,
};


class PopupboxManager extends EventEmitter {
    content: JSX.Element | null = null;
    config: Partial<defaultConfigType> = {};
    show = false;

    private _defaultConfig: defaultConfigType | null = null;

    constructor() {
        super();

        this.open = this.open.bind(this);
        this.update = this.update.bind(this);
        this.close = this.close.bind(this);
    }

    setDefault(defaultConfig: defaultConfigType) {
        this._defaultConfig = defaultConfig;
    }

    open({ content, config = {} }: openType) {
        this.content = content || null;

        this.config = config || this._defaultConfig;

        this.show = true;
        this.emitChange();
    }

    update({ content, config = {} }: openType) {
        this.content = content || this.content;
        this.config = merge(this.config, config);
        this.emitChange();
    }

    close() {
        this.show = false;
        this.emitChange();
    }

    emitChange() {
        this.emit(Constants.CHANGE, {
            children: this.content,
            config: this.config,
            show: this.show
        });
    }

    addChangeListener(callback: ListenerType) {
        this.addListener(Constants.CHANGE, callback);
    }

    removeChangeListener(callback: ListenerType) {
        this.removeListener(Constants.CHANGE, callback);
    }
}

export default new PopupboxManager();
