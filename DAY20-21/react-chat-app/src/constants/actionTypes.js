//각종 액션 타입 정의

//***각종 레이아웃 전역데이터 관리 액션 타입정의영역***

//최좌측 메뉴 클릭시 클릭한 메뉴아이디 값을 전역데이터로  저장하고 중간에 탭컴포넌트에 관련 메뉴컴포넌트 표시하는 시나리오-선택메뉴텍스트
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

//채팅화면 상단 채팅대상자 아이콘 클릭시 해당 채팅 대상자 프로필을 화면 맨 우측에 사이드바로 표현해주는 시나리오구현-Visible
export const OPEN_USER_PROFILE_SIDEBAR = "OPEN_USER_PROFILE_SIDEBAR";

//최좌측 메뉴바 하단에 Dark/Light모드 선택에 따른 전체 컴포넌트 테마 색상 적용해주는 시나리오구현-테마타입
export const SET_LAYOUT_MODE = "SET_LAYOUT_MODE";
