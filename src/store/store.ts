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

export const createStore = (preloadedState?: any) => {
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

// TODO да, костыльно. пока другого варианта не нашёл
const storeForTypings = createStore();

export type TRootState = ReturnType<typeof storeForTypings.getState>;

export type TAppDispatch = typeof storeForTypings.dispatch;
