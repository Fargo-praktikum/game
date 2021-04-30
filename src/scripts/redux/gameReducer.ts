import { AnyAction, Reducer } from "redux";

const SET_GAME_INFO = "SET_GAME_INFO";
const SET_GAME_STATUS = "SET_GAME_STATUS";

export type gameStatusType = "main" |"start" | "game" | "finish" | null;

const initialState = {
    gameInfo: {
        theme: null as string | null,
    },
    gameStatus: null as gameStatusType,
};

export type gameReducerType = typeof initialState;

const gameReducer: Reducer<gameReducerType> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_GAME_INFO:
            return {
                ...state,
                gameInfo: action.gameInfoData,
            };
        case SET_GAME_STATUS:
            return {
                ...state,
                gameStatus: action.gameStatus,
            };
        default:
            return state;
    }
};

export default gameReducer;


export const setGameInfo = (gameInfoData: typeof initialState.gameInfo): { type: string, gameInfoData: { theme: string | null } } =>
    ({ type: SET_GAME_INFO, gameInfoData });

type setStatusType = {
    type: string,
    gameStatus: gameStatusType,
};

export const setGameStatus = (gameStatus: gameStatusType): setStatusType =>
    ({ type: SET_GAME_STATUS, gameStatus });
