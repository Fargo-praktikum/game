import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ThemeApi from "../api/themeApi";
import { TAppDispatch } from "./store";

interface GameState {
    theme: string;
}

interface ThemeData {
    themeId: number,
    userId: number
}

const themeApi: any = new ThemeApi();

const initialState: GameState = {
    theme: "BASIC"
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload;
        }
    }
});

export const getTheme = (values: number) => {
    console.log("testtttttttttttttttttt");
    return async (dispatch: TAppDispatch) => {
        const { theme } = await themeApi.getUserTheme(values);
        //TODO добавить запрос темы при авторизации
        console.log(theme, values, "WWWWWWWWWWWWWWWWWWWW");
        return dispatch(setTheme(theme));
    };
};

export const getTheme2 = (values: number) => {
    console.log("test3222222tttttttttttttttttt");
    return async () => {
        const { theme } = await themeApi.getUserTheme(13);
        //TODO добавить запрос темы при авторизации
        console.log(theme, values, "WWW2222222222222222WWWWWWWWWWWWWWWWW");
        return theme;
    };
};

export const changeTheme = (values: ThemeData) => {

    return async (dispatch: TAppDispatch) => {
        const { theme } = await themeApi.changeTheme(values);
        return dispatch(setTheme(theme));
    };
};

export const { setTheme } = gameSlice.actions;

export default gameSlice.reducer;
