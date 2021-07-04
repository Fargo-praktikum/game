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
    return async (dispatch: TAppDispatch) => {
        const { theme } = await themeApi.getUserTheme(values);
        //TODO добавить запрос темы при авторизации
        return dispatch(setTheme(theme));
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
