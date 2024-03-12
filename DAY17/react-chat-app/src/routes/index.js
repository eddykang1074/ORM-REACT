//기정의된 라우팅 주소 규칙에 따라 페이지를 렌더링 할때
//해당 콘텐츠 페이지를 감싸주는 인증이 필요한 레이아웃 컴포넌트와 비인증 레이아웃 컴포넌트를
//라우팅 페이지 컴포넌트와 통합해서 최종 브라우저에 렌더링 시키는 역할 제공

import React, { Suspense } from "react";
import { Routes as SwitchRoute, Route, Navigate } from "react-router-dom";

//Suspense객체는 V18버전에 오면서 새로운 강력한 기능이 제공되는데
//화면 컴포넌트가 렌더링 작업이 끝날때까지 잠시 중단시키고 다른 컴포넌트를 먼저 렌더링하게하는 기능제공
//주로 특정 컴포넌트에서 사용하는 데이터의 로딩지연 바인딩 지연시 특정 UI요소를 대체해서 보여주고
//해당 컴포넌트가 렌더링이 완료되면 자동으로 기존 요소는 사라지고 오리지널 호출 화면이 렌더링 되게해주는 효과제공
//용도:렌더링하고자하는 컴포넌트를 Suspense로 감싸고 fallback속성에 대체할 UI요소를 정의합니다.

//routes.js 모듈에서 정의한 화면별 라우팅규칙 참조
import { authProtectedRoutes, publicRoutes } from "./routes";

//비인증 기반 레이아웃 화면 컴포넌트 참조
import NonAuthLayout from "../layouts/NonAuthLayout";

//인증 기반 레이아웃 화면 컴포넌트 참조
import AuthLayout from "../layouts/AuthLayout";

//로그인여부를 체크한후에 인증되었을때만 보여줘야하는 주소를 호출한경우 로그인 페이지로 반환하는 함수 정의
const AuthProtected = (props) => {
  //로그인한 사용자 JWT토큰이 없거나 현재 호출하는 페이지가 인증에 의해 보호되는 페이지인경우 로그인페이지로 이동시킴
  if (props.isAuthProtected && !localStorage.getItem("jwttoken")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

//메인 라우팅 컴포넌트 구현
const Routes = () => {
  return (
    <React.Fragment>
      {/* Suspens를 이용해 해당 태그내에 정의된 모든 개별 라우팅 화면컴포넌트가 완전 렌더링전에 임시로 보여줄
            UI 요소를 fallback속성으로 정의한다. */}
      <Suspense fallback={<div>로딩중....</div>}>
        {/* 여러개의 라우터를 Routes로 감싸줘야한다. */}
        <SwitchRoute>
          {/* 비인증 페이지 컴포넌트 라우팅 적용하기  */}
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              layout={NonAuthLayout}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {/* 인증이 반드시 필요한 페이지 라우팅 컴포넌트에 대한 레이아웃 통합적용하기
                    각각의 페이지컴포넌트를 로그인여부/인증여부를 체크해 비로그인인경우 로그인 페이지로 이동처리하는 로직추가적용 */}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              layout={AuthLayout}
              element={<AuthLayout>{route.component}</AuthLayout>}
              key={idx}
              isAuthProtected={true}
            />
          ))}

          {/* {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              layout={AuthLayout}
              element={
                <AuthProtected isAuthProtected={true}>
                  <AuthLayout>{route.component}</AuthLayout>
                </AuthProtected>
              }
              key={idx}
              isAuthProtected={true}
            />
          ))} */}
        </SwitchRoute>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
