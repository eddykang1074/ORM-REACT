import React, { useReducer } from "react";

//리듀서 함수를 별도 재활용가능한 모듈로 분리하여 참조해 사용할수있다.
//여러 컴포넌트에서 해당 리듀서함수의 로직과 프로세스를 재사용하고 싶을 때 유용합니다.
import countReducer from "./countReducer";

//리듀서 함수는  일반적으로 여러 컴퍼넌트에서 공유하기에
//해당 컴포넌트 위에 정의하거나 별도 모듈파일로 만들어서 외부파일로 만들고 참조해서 사용한다.
// function countReducer(state, action) {
//   switch (action.type) {
//     case "INCREASE":
//       //지정된 상태값 변경 및 로직처리
//       return state + 1;
//     case "DECREASE":
//       return state - 1;
//     case "INIT":
//       return 0;
//     default:
//       return state; //현재 상태값 반환
//   }
// }

const UseReducerHook = () => {
  //리듀서 훅의 상태값 구조 정의 및 초기값을 할당하고
  //디스패치(UI요소에서 해당 리듀서함수를 실행시켜주는 커맨드역할)와
  //리듀서 함수(관련 상태값을 CASEBY로 변경하고 로직을 구현한다.)를 정의한다.

  const [count, dispatchCount] = useReducer(countReducer, 0);

  return (
    <div>
      <h1>useReducer 훅 개발 샘플</h1>

      <h3>카운터:{count}</h3>
      <button onClick={() => dispatchCount({ type: "INCREASE" })}>증가</button>
      <button onClick={() => dispatchCount({ type: "DECREASE" })}>감소</button>
      <button onClick={() => dispatchCount({ type: "INIT" })}>초기화</button>
    </div>
  );
};

export default UseReducerHook;
