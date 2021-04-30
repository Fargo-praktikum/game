import { AnyAction } from "redux";

const SET_GAME_INFO = "SET_GAME_INFO";

const initialState = {
    gameInfo: {
        theme: null as string | null,
    },
};

function gameReducer(state = initialState, action: AnyAction): { gameInfo: {theme: string | null} } {
    switch (action.type) {
        case SET_GAME_INFO:
            return {
                ...state,
                gameInfo: action.gameInfoData,
            };
        default:
            return state;
    }
}

export default gameReducer;


export const setGameInfo = (gameInfoData: typeof initialState.gameInfo): { type: string, gameInfoData: {theme: string | null} }  =>
    ({ type: SET_GAME_INFO, gameInfoData });
