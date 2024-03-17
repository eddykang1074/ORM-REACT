import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//리액트 라우팅을 위한 BrowserRouter 참조
import { BrowserRouter } from "react-router-dom";

//프로바이더 객체 추가
//react-redux 설치 패키지내에 Provider객체를 참조해서
//Provider를 통해서 리액트앱과 Store를 연결한다.
import { Provider } from "react-redux";

//Redux Saga사용시 스토어 구성하기
// import { configureStore } from "./redux/store";

//리덕스 기초 스토어 참조하기
import store from "./redux/store";

//전역정보 웹브라우저 스토리지에 저장하기 위한 redux-persist 추가설정
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
