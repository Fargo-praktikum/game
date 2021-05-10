import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    theme: string | null;
}

const initialState: GameState = {
    theme: null
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<string | null>) {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = gameSlice.actions;

export default gameSlice.reducer;
