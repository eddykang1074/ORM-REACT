import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";

//전역 컨텍스트 참조하기
import { AppContext } from "../App";

//전역 데이터 값을 조회하고 반환하는 함수 정의
function useTodoCountState() {
  console.log("TodoList AppContext===>", useContext(AppContext));
  //useContext(AppContext)는 배열을 반환하고 배열의 첫번쨰 값에 context Value값이 전달됩니다.
  const context = useContext(AppContext);
  return context;
}

const TodoList = () => {
  const refTitle = useRef(null);

  //전역 데이터중 카운터 상태값을 관리해주는  개발자 정의 훅을 이용한 데이터제어 하기
  //전역 데이터 상태값을 관리해주는 useState 개발자 정의 훅 구현하기
  //전역데이터를 Setter함수로 해당 컴포넌트에서 관리해주기 위한 전용 훅 정의
  //useTodoCountState는 배열을 반환하고 배열의 첫번쨰 값으로 value 값이 반환됩니다.
  const [, setTodoCount] = useTodoCountState();

  //단일 할일정보
  const [todo, setTodo] = useState({
    title: "",
    contents: "",
    orderby: 0,
  });

  //할일데이터 목록
  const [todoList, setTodoList] = useState([]);

  //최초 컴포넌트가 마운팅될떄를 감지해서 제목입력박스에 포커스를 맞춘다.
  useEffect(() => {
    refTitle.current.focus();
  }, []);

  //할일정보 속성 데이터 바인딩 처리 이벤트 핸들러함수
  const onTodoChange = useCallback(
    (e) => {
      setTodo({ ...todo, [e.target.name]: e.target.value });
    },
    [todo]
  );

  //할일 추가하기
  const onAdd = useCallback(() => {
    setTodoList([...todoList, todo]);

    setTodo({
      title: "",
      contents: "",
      orderby: 0,
    });

    refTitle.current.focus();

    //전역데이터 값 변경처리하기
    setTodoCount(() => todoList.length + 1);
  }, [todo, todoList]);

  return (
    <div>
      <h1>TodoList 관리자</h1>
      할일제목:
      <input
        ref={refTitle}
        name="title"
        value={todo.title}
        onChange={onTodoChange}
      />
      <br />
      할일내용:
      <input name="contents" value={todo.contents} onChange={onTodoChange} />
      <br />
      우선순위:
      <input name="orderby" value={todo.orderby} onChange={onTodoChange} />
      <br />
      <button onClick={onAdd}>추가</button>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item.title}--{item.contents}--{item.orderby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
