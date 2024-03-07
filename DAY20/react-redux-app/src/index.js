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

//리덕스 스토어 참조하기
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
