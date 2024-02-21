import React, { useState } from 'react'

const TodoRegist = ({ onInsert }) => {
    const [todo, setTodo] = useState({ text: '', desc: '' })

    const onTodoChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        onInsert(todo.text, todo.desc)
        setTodo({ text: '', desc: '' })
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="text" value={todo.text} onChange={onTodoChange} />
                <input name="desc" value={todo.desc} onChange={onTodoChange} />
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default TodoRegist
