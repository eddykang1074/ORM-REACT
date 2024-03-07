import { USER_LOGIN } from "../../constants/actionTypes";

export const userLogin = (token, loginUser) => ({
  type: USER_LOGIN,
  payload: { token, loginUser },
});
