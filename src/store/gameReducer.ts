import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ThemeApi from "../api/themeApi";
import { TAppDispatch } from "./store";

interface GameState {
    theme: string;
}

const themeApi: any = new ThemeApi();

const initialState: GameState = {
    theme: new Date().getTime().toString()
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
    return async (dispatch: TAppDispatch) => {
        const { theme } = await themeApi.getUserTheme(values);
        //TODO добавить запрос темы при авторизации
        console.log(dispatch, theme, "current theme");
        //return dispatch(setTheme(theme));
    };
};

export const changeTheme = (values: number) => {
    return async (dispatch: TAppDispatch) => {
        const { theme } = await themeApi.changeTheme(values);
        return dispatch(setTheme(theme));
    };
};

export const { setTheme } = gameSlice.actions;

export default gameSlice.reducer;
