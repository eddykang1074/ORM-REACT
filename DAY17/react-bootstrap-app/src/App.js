import React from "react";

//bootstrap css 파일 직접 참조하기
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//bootstrap css Sass(scss)파일을 직접 참조하고 css번들링을 통해 부트스트랩.css파일 생성해서 사용하기
//React프로젝트에서 ~.scss파일을 참조한경우 반드시 번들링 SW를 통해서 CSS번들링과정을 거친후에야 CSS사용가능함
//yarn add node-sass 를 리액트 프로젝트에 설치하면 리액트 파일내~.scss파일이 node-sass에 의해 자동 번들링(웹팩)되어 순수 css로 변환됨
import "../node_modules/bootstrap/scss/bootstrap.scss";

//라우팅을 위한 react-router-dom 패키지의 BrowserRouter,Routes,Route 참조하기
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//React.lazy()사용하지 않고 직접 컴포넌트 참조하여 라우팅처리하기- 비권장(컴포넌트가 많지 않을떄 사용)
import GNB from "./components/GNB";
import Footer from "./components/Footer";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Articles from "./pages/Articles";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <Router>
      <GNB></GNB>
      <div className="App">
        <Routes>
          <Route path="/" exact={true} Component={Login} />
          <Route path="/signin" Component={Login} />
          <Route path="/signup" Component={Register} />

          <Route path="/articles" Component={Articles} />
          <Route path="/article" Component={Article} />
          <Route path="/article/:aid" Component={ArticleDetail} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
