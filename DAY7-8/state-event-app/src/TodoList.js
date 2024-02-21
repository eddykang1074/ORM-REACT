import React, { useState } from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({ todos, onRemove, onSelect }) => {
    return (
        <div>
            <table style={{ margin: '0 auto', width: '50%' }}>
                <tbody>
                    {todos.map((todo) => (
                        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onSelect={onSelect} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList
