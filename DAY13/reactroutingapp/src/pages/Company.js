import React from "react";

//Outlet안 중첩라우팅의 자식요소 컴포넌트를 부모 컴포넌트서 어디에 위치시킬지를 지정하는요소를 참조한다.
import { Outlet } from "react-router-dom";

const Company = () => {
  return (
    <div>
      <h1>회사소개 웹페이지</h1>
      <p>엠소프트웨어는 실시간 웹메시징 솔루션 전문기업입니다.</p>

      {/* 
      중첩라우팅 요소에서 지정한 자식 컴포넌트가 아래 위치에 출력됩니다.
      자식요소를 추출하려면 중첩라우팅 주소를 호출해야합니다 http://localhost:3000/company/location
       */}
      <Outlet />
    </div>
  );
};

export default Company;
