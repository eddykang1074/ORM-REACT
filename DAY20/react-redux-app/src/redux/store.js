//store구성을 위한 추가 패키지 설치
//yarn add @reduxjs/toolkit -D
//redux기반 store 환경을 쉽게 구성해주기 위한 추가 패키지 설치 필요

//@reduxjs/toolkit패키지에서 제공하는 configureStore 함수를 참조해서 손쉽게 store를 구성합니다.
import { configureStore } from "@reduxjs/toolkit";

//통합된 리듀서함수를 참조합니다.
import reducers from "./reducers";

//전역데이터 저장소 store를 구성합니다.
const store = configureStore({
  reducer: reducers,
  devTools: true,
});

//전역 저장소 객체를 노출합니다.
export default store;
