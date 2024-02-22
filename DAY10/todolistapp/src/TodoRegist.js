import React, { useState, useEffect } from "react";

const TodoRegist = ({ onInsert, onUpdate, todoData }) => {
  //단일할일정보 데이터 구조정의 및 초기값할당
  const [todo, setTodo] = useState(todoData);
  // const [todo, setTodo] = useState({ id: 0, text: "", desc: "" });

  useEffect(() => {
    console.log("todoData===========>", todoData);
    if (todoData.id > 0) {
      setTodo({ id: todoData.id, text: todoData.text, desc: todoData.desc });
    }
  }, [todoData]);

  // console.log("todoData===========>", todoData);

  // if (todoData.id > 0) {
  //   setTodo({ id: todoData.id, text: todoData.text, desc: todoData.desc });
  // }

  //할일 정보 입력시 관련 UI요소에 바인딩된 상태 속성값 변경처리 이벤트 처리함수
  const onTodoChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  //폼내 Submit이벤트가 발생하면 실행되는 이벤트 핸들러 함수 정의
  const onSumit = (e) => {
    //App.js 컴포넌트에서 props로 전달된  onInsert()이벤트 처리함수를 호출해 toDoList에 데이터를 반영한다.
    //onInsert(todo.text, todo.desc);

    //setTodo({ text: "", desc: "" });

    //자바스크립트에서 UI요소이벤트 파생을 최소시키는 함수
    //현재 발생한 e(Submit)이벤트를 더이상 진행되지않게 차단하는 기능...
    e.preventDefault();
  };

  const onRegist = (e) => {
    //App.js 컴포넌트에서 props로 전달된  onInsert()이벤트 처리함수를 호출해 toDoList에 데이터를 반영한다.
    onInsert(todo.text, todo.desc);

    setTodo({ text: "", desc: "" });
  };

  return (
    <div>
      <form onSubmit={onSumit}>
        제목:
        <input name="text" value={todo.text} onChange={onTodoChange} />
        내용:
        <input name="desc" value={todo.desc} onChange={onTodoChange} />
        <button onClick={onRegist}>등록</button>
        <button onClick={() => onUpdate(todo)}>수정</button>
      </form>
    </div>
  );
};

export default TodoRegist;
