import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import isServer from "../utils/isServer";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import forumReducer from "./forumReducer";
import gameReducer from "./gameReducer";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

// global redeclared types
declare global {
    interface Window {
        __INITIAL_STATE__?: string;
    }
}

const preloadedState = (!isServer)
    ? (window.__INITIAL_STATE__)
        ? JSON.parse(window.__INITIAL_STATE__)
        : undefined
    : undefined;

if (!isServer) {
    delete window.__INITIAL_STATE__;
}

export const initStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            forum: forumReducer,
            game: gameReducer,
            app: appStateReducer
        },
        middleware,
        devTools: process.env.NODE_ENV !=="production" && !isServer,
        preloadedState
    });
};

// eslint-disable-next-line
let store = initStore();

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
