//액션타입 참조
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from "../../constants/actionTypes";

//리듀서 전역데이터 관리 초기값 구조정의 및 값할당
const INIT_STATE = {
  token: "",
  loginUser: {},
  isUserLogout: false,
};

//Auth리듀서함수 정의
const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loginUser: action.payload.loginUser,
      };
    case LOGOUT_USER_SUCCESS:
      return { ...state, token: "", loginUser: {}, isUserLogout: true };
    default:
      return state;
  }
};

export default Auth;
