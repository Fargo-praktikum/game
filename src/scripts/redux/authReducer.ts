import { AnyAction, Reducer } from "redux";


//TODO здесь нужна нормальная типизация.
const SET_AUTH_INFO = "SET_AUTH_INFO";


const initialState = {
    userInfo: {
        id: null as number | null,
        login: null as string | null,
        displayName: null as string | null,
        firstName: null as string | null,
        secondName: null as string | null,
        email: null as string | null,
        avatar: null as string | null,
        phone: null as string | null,
    },
};

export type authReducerType = typeof initialState;

const authReducer: Reducer<authReducerType> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
    // TODO: СРЕДНИЙ. В дальнейшем здесь опишем корректную логику для пользователя
        case SET_AUTH_INFO:
            if (typeof action.userInfoData.avatar === "string") {
                action.userInfoData.avatar = `https://ya-praktikum.tech/api/v2/resources${action.userInfoData.avatar as string}`;
            }
            return {
                ...state,
                userInfo: action.userInfoData,
            };
        default:
            return state;
    }
};

export default authReducer;

export const setUserInfoAC = (userInfoData: typeof initialState.userInfo) => ({ type: SET_AUTH_INFO, userInfoData });
