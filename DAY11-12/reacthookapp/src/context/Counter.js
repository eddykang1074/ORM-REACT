//어플리케이션 컨텍스트 프로바이더에서 제공하는 전역데이터 참조를 위한 useContext훅 참조하기
import React, { useContext, useState, useEffect } from "react";

//전역상태정보관리 컨텍스트 객체참조하기
import { AppContext } from "../App";

const Counter = () => {
  //카운터 전역 데이터 값 추출하기
  //console.log("Counter AppContext===>", useContext(AppContext));
  //useContext(AppContext)는 배열을 반환하고 배열의 첫번쨰 값에 context Value값이 전달됩니다.
  const [count] = useContext(AppContext);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

export default Counter;
