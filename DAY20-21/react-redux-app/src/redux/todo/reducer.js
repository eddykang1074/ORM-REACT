//STEP1: 해당 리듀서와 관련된 액션 타입을 참조합니다.
import { TODO_COUNT, TODO_ADD } from "../../constants/actionTypes";

//STEP2: 전역데이터 저장소(STORE)에 생성할 기본 전역데이터 구조를 정의하고 초기값을 정의합니다.
const INIT_STATE = {
  todoCount: 200,
};

//STEP3: 리듀셔함수를 정의해서 액션타입별로 전역데이터 공간에 데이터를 반영한다.
//리듀서함수는 해당 업무와 관련된 다양한 액션타입별로 전역상태를 관리해주는 기능을 제공합니다.
//리듀셔함수에 입력파라메터로 action 타입 객체가 전달되고요. action 타입 객체안에는 화면 컴포넌트에서 전달된 데이터가 포함되어 있음
//해당 업무 전용 리듀서 함수는 다양한 해당업무 액션타입별로 데이터를 case by case로 관리할수 있다.
//state는 store에 저장된 전체 globalState내 todo전용 전역데이터를 말함
const Todo = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODO_COUNT:
      return { ...state, todoCount: action.payload.todoCount };
    default:
      return { ...state };
  }
};

//STEP4: Todo리듀서 함수를 노출시킨다.
export default Todo;
