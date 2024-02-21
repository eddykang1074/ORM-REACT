import React, { useState } from "react";

//Tolist 컴포넌트 참조하기
import TodoTemplate from "./TodoTemplate";
import TodoRegist from "./TodoRegist";
import TodoList from "./TodoList";

function App() {
  //할일 목록 데이터 구조 정의 및 초기값 할당하기
  //풀스택 개발자 되기 할일 목록 데이터 정의
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "백엔드 기술 습득하기",
      desc: "node.js,epxress,mvc",
      checked: false,
    },
    {
      id: 2,
      text: "클라우드 기술 습득하기",
      desc: "devops,iaas,paas,faas,caas,aws..",
      checked: false,
    },
    {
      id: 3,
      text: "프론트엔드 기술 습득하기",
      desc: "html,css,react cra,nextjs ...",
      checked: false,
    },
  ]);

  //할일고유번호 데이터 정의 및 초기값할당=원시타입정의
  const [nextId, setNextId] = useState(4);

  //할일등록 처리 이벤트 처리함수 정의
  //처리해야할 데이터가 존재하는 컴포넌트에서 이벤트처리함수를 정의하고 자식요소로 props를 통해 전달할수 있다.
  //자식요소에서는 전달된 이벤트 함수를 실행시킬수 있고 해당함수는 결국 부모 컴포넌트의 데이터를 변경하게된다.
  const onInsert = (text, desc) => {
    //기존배열의 복사본을 만들고 신규 객체를 추가한다.
    //setTodos(...todos, { id: nextId, text: text, desc: desc, checked: false });

    //할일목록 데이터에 신규할일 데이터 추가
    setTodos(
      todos.concat({ id: nextId, text: text, desc: desc, checked: false })
    );

    //다음 채번번호 증가처리
    setNextId(nextId + 1);
  };

  //특정 단일 할일정보 삭제 처리함수 정의
  const onRemove = (id) => {
    //삭제하려는 id값을 제외한 할일목록을 조회해서 todos 목록을 갱신해준다.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //특정 할일정보 체크박스 선택시 상태변경 처리함수 정의
  //클릭한 특정 할일의 체크박스에 바인딩된 개별 데이터객체의  checked 속성의 값을 변경해주는 기능제공
  const onSelect = (id) => {
    //할일 목록안에 특정 단일아이템의 값을 바꾸는것이기 떄문에 setTodos()를 호출하고 호출시 특정아이템을 찾고 관련속성값을 변경한다.
    //todo목록데이터의 map()메소드를 호출해서 배열복사본을 만들고 배열복사본을 반복해서 동일한 id값이 있는 객체를 찾은후
    //동일한 객체가 있는경우 해당객체의 복사본(deepcopy)를 실시하고 복사본의 특정값도 변경해서 신규객체를 배열에 반환하고 그렇지 않으면
    //기존 복사본(shallow copy)본을 반환한다.
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <TodoTemplate>
        <h3>총할일 : {todos.length} 건</h3>

        {/* 부모에서 정의된 함수(이벤트핸들러함수)도 props방식으로 자식요소에 전달이 가능하다. */}
        <TodoRegist onInsert={onInsert}></TodoRegist>

        <TodoList
          todos={todos}
          onRemove={onRemove}
          onSelect={onSelect}
        ></TodoList>
      </TodoTemplate>
    </div>
  );
}

export default App;
