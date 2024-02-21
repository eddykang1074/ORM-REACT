import react, { useState, useRef } from 'react'
import logo from './logo.svg'
import './App.css'

import DataBindingTest from './DataBindingTest'

import PrimitiveTypeEvent from './PrimitiveTypeEvent'

import ReferTypeEvent from './ReferTypeEvent'

import ProductManager from './ProductManager'

import TodoTemplate from './TodoTemplate'
import TodoRegist from './TodoRegist'
import TodoList from './TodoList'

function App() {
    //const nextId = useState(4)
    const nextId = useRef(4)

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '백엔드기술 습득하기',
            desc: 'node.js express,mvc',
            checked: true,
        },
        {
            id: 2,
            text: '클라우드기술 습득하기',
            desc: 'devops,cloud iaas',
            checked: true,
        },
        {
            id: 3,
            text: '리액트기술 습득하기',
            desc: 'react,ssr',
            checked: false,
        },
    ])

    //등록하기 이벤트 핸들러 함수
    const onInsert = (text, desc) => {
        const todo = {
            id: nextId.current,
            text,
            desc,
            checked: false,
        }
        setTodos(todos.concat(todo))
        nextId.current += 1
    }

    //할일삭제하기 이벤트 핸들러 함수
    const onRemove = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    //단일할일 정보 선택하기-목록에서 체크박스선택
    const onSelect = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
    }

    return (
        <div className="App">
            {/* <DataBindingTest></DataBindingTest>
            <hr></hr>
            <PrimitiveTypeEvent></PrimitiveTypeEvent>
            <hr></hr>
            <ReferTypeEvent></ReferTypeEvent>

            <hr></hr>
            <ProductManager></ProductManager> */}

            <TodoTemplate>
                <TodoRegist onInsert={onInsert}></TodoRegist>
                <TodoList todos={todos} onRemove={onRemove} onSelect={onSelect}></TodoList>
            </TodoTemplate>
        </div>
    )
}

export default App
