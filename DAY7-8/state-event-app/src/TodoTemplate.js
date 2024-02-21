import React from 'react'

const TodoTemplate = ({ children }) => {
    return (
        <div>
            <h1>풀스택 개발자 되기 - 일정관리앱</h1>
            <div>{children}</div>
        </div>
    )
}

export default TodoTemplate
