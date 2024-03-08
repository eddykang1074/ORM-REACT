//각종 리덕스에서 사용하는 액션타입(액션이름)을 상수값으로 정의해서 전역으로 사용하기 위함

//TodoList에 할일이 추가되면 전역데이터로 공유할 할일건수 관리 액션타입 정의
export const TODO_COUNT = "TODO_COUNT";

//사용자 로그인 액션에 대한 액션타입으로 로그인 후 로그인한 사용자 정보를 전역데이터로 관리하기 위한 시나리오 구현
export const USER_LOGIN = "USER_LOGIN";

//사용자가 테마 색상을 변경시 전역 데이터로 현재 적용된 테마색상을 관리하기 위한 액션 시나리오 정의
export const THEME_COLOR = "THEME_COLOR";

//API호출 에러 액션타입
export const API_FAILED = "API_FAILED";

//SAGA기반 로그인 처리 액션타입
export const LOGIN_USER = "LOGIN_USER";
