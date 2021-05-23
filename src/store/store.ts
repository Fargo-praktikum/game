import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import forumReducer from "./forumReducer";
import gameReducer from "./gameReducer";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const store = configureStore({
    reducer: {
        auth: authReducer,
        forum: forumReducer,
        game: gameReducer,
        app: appStateReducer
    },
    middleware,
    devTools: process.env.NODE_ENV !=="production"
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
