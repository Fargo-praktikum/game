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

export const storeWithInitState = (preloadedState?: TRootState) => configureStore({
    reducer: {
        auth: authReducer,
        forum: forumReducer,
        game: gameReducer,
        app: appStateReducer
    },
    middleware,
    devTools: process.env.NODE_ENV !=="production" && !isServer,
    preloadedState,
});


const store = configureStore({
    reducer: {
        auth: authReducer,
        forum: forumReducer,
        game: gameReducer,
        app: appStateReducer
    },
    middleware,
    devTools: process.env.NODE_ENV !=="production" && !isServer,
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
