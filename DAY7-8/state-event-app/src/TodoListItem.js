import React, { useState } from 'react'

const TodoListItem = ({ todo, onRemove, onSelect }) => {
    const { id, text, desc, checked } = todo

    return (
        <tr>
            <td>
                <input type="checkbox" value={checked} onClick={() => onSelect(id)} />
            </td>
            <td>{id}</td>
            <td>{text}</td>
            <td>{desc}</td>
            <td>
                <button onClick={() => onRemove(id)}>삭제</button>
            </td>
        </tr>
    )
}

export default TodoListItem
