//코드분할방식을 통해 라우팅하기 위해 Suspense 객체를 참조합니다.
import React, { Suspense } from "react";

//라우팅을 위한 Routes,Route객체를 참조합니다.
//yarn add react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//컴포넌트 참조하기-기본방식
import Header from "./components/Header";
import Footer from "./components/Footer";

//각종 페이지 컴포넌트를 참조한다.
//일반적인 컴포넌트 참조방식은 최초 로딩시 성능저하 그리고 컴포넌트 렌더링시 대체 효과등을 주기가 어렵다

// import Main from "./pages/Main";
// import Company from "./pages/Company";
// import CompanyLocation from "./pages/CompanyLocation";
// import Login from "./pages/auth/Login";
// import Entry from "./pages/auth/Entry";
// import ArticleList from "./pages/board/ArticleList";
// import ArticleRegist from "./pages/board/ArticleRegist";
// import ArticleDetail from "./pages/board/ArticleDetail";
// import Product from "./pages/product/Product";
// import Category from "./pages/product/Category";
// import NoneExistPage from "./pages/NoneExistPage";

//react.lazy()메소드와 Suspens를 이용해 코드분할방식을 적용해서
//최초 로딩 및 라우팅시 성능 개선을 처리해봅니다.
//React.lazy(import구문을 이용해 컴포넌트를 참조반환합니다.)
//react.lazy()를 이용해 코드분할하는경우 2가지 규칙이 있는데요
//첫번쨰 Routes 객체를 반드시 Suspens로 감싸주고 대체 UI를 구현합니다.
//Suspens는 라우팅하려면 해당 컴포넌트가 완전히 렌더링 되기전(백엔드 restful호출시간까지포함)까지
//특정 대체 요소를 통해 화면에 표시해주는 환경을 제공해줌...

const Main = React.lazy(() => import("./pages/Main"));
const Company = React.lazy(() => import("./pages/Company"));
const CompanyLocation = React.lazy(() => import("./pages/CompanyLocation"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Entry = React.lazy(() => import("./pages/auth/Entry"));
const ArticleList = React.lazy(() => import("./pages/board/ArticleList"));
const ArticleRegist = React.lazy(() => import("./pages/board/ArticleRegist"));
const ArticleDetail = React.lazy(() => import("./pages/board/ArticleDetail"));
const Product = React.lazy(() => import("./pages/product/Product"));
const Category = React.lazy(() => import("./pages/product/Category"));
const NoneExistPage = React.lazy(() => import("./pages/NoneExistPage"));

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* App.js 최상위 컴포넌트에서 전체 리액트앱의 레이아웃 구성을 합니다. */}

        {/* 상단 GNB 공통 레이아웃 메뉴 영역  */}
        <Header></Header>

        {/* 컨텐츠 영역에 라우트를 이용해 라우팅 주소를 정의하고 라우팅 규칙을 정의합니다. */}
        {/* 여러개의 라우팅 규칙을 정의하기 위해 Routes로 Route를 감싸준다. */}

        {/* Routes는 사용자가 요청한 주소와 동일한 주소 컴포넌트를 딱 한개만 반환합니다.  */}

        <Suspense
          fallback={<div>로딩중...이미지 또는 텍스트를 여기에 표현합니다.</div>}
        >
          <Routes>
            {/* Route path속성에 URL주소체계를 정의하고 Component 속성에 상단 참조한 컴포넌트를 정의한다. */}
            <Route path="/" Component={Main} />

            {/* 회사소개 라우팅에 중첩 라우팅 구현하기  */}
            <Route path="/company" Component={Company}>
              <Route path="location" Component={CompanyLocation} />
            </Route>

            <Route path="/login" Component={Login} />
            <Route path="/entry" Component={Entry} />

            <Route path="/article/list" Component={ArticleList} />
            <Route path="/article/regist" Component={ArticleRegist} />
            <Route path="/article/detail" Component={ArticleDetail} />

            <Route path="/product/detail" Component={Product} />
            <Route path="/product/category/:idx" Component={Category} />

            {/* *은 사용자가 요청한 웹페이지와 일치하지 않은 경우 보여줄 컴포넌트 지정하기 */}
            <Route path="*" Component={NoneExistPage} />
          </Routes>
        </Suspense>

        {/* 하단 풋터 레이아웃 공통 영역  */}
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
