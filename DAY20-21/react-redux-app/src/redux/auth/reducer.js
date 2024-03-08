//액션타입 참조
import { USER_LOGIN, LOGIN_USER } from "../../constants/actionTypes";

//리듀서 전역데이터 관리 초기값 구조정의 및 값할당
const INIT_STATE = {
  token: "",
  loginUser: {},
};

//Auth리듀서함수 정의
const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        loginUser: action.payload.loginUser,
      };
    case LOGIN_USER:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default Auth;
