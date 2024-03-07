import React, { useState } from "react";

//redux전역데이터 공간에 데이터를 반영하려면 useDispatch라는 훅을 참조합니다.
import { useDispatch } from "react-redux";

//redux 전역공간에 데이터를 반영하려면 반드시 액션함수를 참조해야합니다.
//리덕스 폴더안에 액션통합모듈을 참조하고 관련 액션함수(addTodoCount)를 참조합니다.
import { addTodoCount } from "../redux/actions";

const TodoList = () => {
  //전역 데이터 반영을 위한 useDispatch 훅 변수 생성하기
  const globalDispatch = useDispatch();

  //단일할일 정보 구조정의
  const [todo, setTodo] = useState({ title: "", orderby: 0 });

  //할일 목록 데이터 구조정의
  const [todoList, setTodoList] = useState([]);

  //할일 정보 데이터 바인딩 처리
  const handleTodo = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  //단일 할일 정보 추가 처리
  const handleAddTodo = () => {
    setTodoList([...todoList, todo]);

    //전역 데이터 공간에 총 할일 건수 전역데이터 반영하기 =globalDispatch
    //globalDispatch(액션함수호출)
    globalDispatch(addTodoCount(todoList.length + 1));
  };

  return (
    <div>
      할일:
      <input name="title" value={todo.title} onChange={handleTodo} />
      <br />
      우선순위:
      <input name="orderby" value={todo.orderby} onChange={handleTodo} />
      <br />
      <button onClick={handleAddTodo}>추가</button>
      <hr></hr>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item.orderby} : {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
