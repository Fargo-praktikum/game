const SET_AUTH_INFO = 'SET_AUTH_INFO';

const initialState = {
  userInfo: {
    id: null as number | null,
    login: null as string | null,
    display_name: null as string | null,
    first_name: null as string | null,
    second_name: null as string | null,
    email: null as string | null,
    avatar: null as string | null,
    phone: null as string | null,
  },
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    // TODO: СРЕДНИЙ. В дальнейшем здесь опишем корректную логику для пользователя
    case SET_AUTH_INFO:
      return {
        ...state,
        userInfo: action.userInfoData,
      };
    default:
      return state;
  }
}

export default authReducer;


export const setUserInfo = (userInfoData: typeof initialState.userInfo) => ({ type: SET_AUTH_INFO, userInfoData });
