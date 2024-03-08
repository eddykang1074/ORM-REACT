//redux-saga 주요 헬퍼함수 참조하기
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

//axios apiClient 참조하기
import { APIClient } from "../../helpers/apiClient";

//액션 타입을 참조합니다.
import { LOGIN_USER, API_FAILED } from "../../constants/actionTypes";

//액션 함수를 참조합니다.
//회원로그인 처리 액션함수를 참조합니다.
import { loginUser, apiError, userLogin } from "../actions";

//백엔드 RESTful통신을 위한 APIClient post메소드(crate()) 함수 생성하기
const create = new APIClient().create;

//로그인 백엔드 통신 처리를 위한 제너레이터 함수 정의
//로그인처리 SAGA 제너레이터 함수
function* login({ payload: { email, password, navigate } }) {
  try {
    //call(백엔드호출함수지정)
    console.log("login*", email, password, navigate);

    const response = yield call(create, "api/member/login", {
      email,
      password,
    });

    //웹브라우저 로컬 스토리지 저장 : 옵션
    localStorage.setItem("authUser", response.data.loginUser);
    localStorage.setItem("authToken", response.data.token);

    //전역 스토어에 로그인 사용자 정보값 반영하기
    //put(실행코자하는 액션함수지정); //스토어의 전역 상태값 변경처리함
    yield put(userLogin(response.data.token, response.data.loginUser));

    //로그인 완료후 대시보드 페이지로 이동처리
    navigate("/");
  } catch (error) {
    console.error("login* error==========>", error);
    yield put(apiError(error));
  }
}

//제너레이터 함수를 노출합니다.
//watchLoginUser함수를 정의하고 기능을 노출하면 추후 관련 액션함수가 실행되면 자동은 saga제너레이터 함수가 실행됩니다.
export function* watchLoginUser() {
  //takeEvery(액션타입,액션saga함수)함수의 목적은 전달되는 액션타입별,액션함수를 실행시켜주는 기능제공
  yield takeEvery(LOGIN_USER, login);
}

//사용자 인증Saga함수를 정의하고 최종 saga함수를 노출시킵니다.
function* authSaga() {
  //all(배열안에 해당 saga함수를 fork메소드로 감싸서 배열형태로 여러개 제공[])
  //all함수는 실행해야할 사가함수들을 배열에 넣고 여러개를 동시에 실행시킬수 있는 제공
  //fork 헬퍼함수는 비동기 기반 함수를 실행할때 사용함
  yield all([fork(watchLoginUser)]);
}

export default authSaga;
