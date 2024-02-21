import React from "react";

const TodoItem = ({ todo, onRemove, onSelect }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={todo.checked}
          onClick={() => onSelect(todo.id)}
        />
      </td>
      <td>{todo.id}</td>
      <td>{todo.text}</td>
      <td>{todo.desc}</td>
      <td>
        <button onClick={() => onRemove(todo.id)}>삭제</button>
      </td>
    </tr>
  );
};

export default TodoItem;
