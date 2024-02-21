import React from "react";

//단일 할일 화면 참조하기
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onRemove, onSelect }) => {
  return (
    <div>
      <table style={{ width: "700px", margin: "20px" }}>
        <thead>
          <tr>
            <th>선택</th>
            <th>id</th>
            <th>할일명</th>
            <th>할일내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={onRemove}
              onSelect={onSelect}
            ></TodoItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
