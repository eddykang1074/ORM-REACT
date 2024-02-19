import React, { useState } from 'react'

const ReferTypeEvent = () => {
    //회원가입 사용자 객체 데이터 구조 정의 및 초기값 세팅하기
    const [user, setUser] = useState({
        email: '',
        password: '',
        userName: '',
    })

    //사용자 정보 입력 UI요소에서 전달되는 이벤트 수신 및 데이터 바인딩처리 이벤트 핸들러
    const handleUser = (e) => {
        //이벤트 발생시점의 user객체의 복사본을 만들고 복사본의 특정속성의 값을 이벤트 발생 UI요소값으로 변경해서 적용한다.
        //...는 spread연산자(operator)는 배열/객체에서 배열/객체를 복사/합치거나 정보 추출시 사용합니다.
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //사용자명 입력 엔터키 선택시 데이터 처리 이벤트 핸들러
    const handleEnterSave = (e) => {
        console.log('사용자 키보드 이벤트 값 표시하기:', e.keyCode)

        //키보드 엔터키 눌림시 이벤트 캐치하기
        if (e.keyCode === 13) {
            console.log('엔터키가 선택되었습니다. ')

            //user 데이터를 백엔드로 그냥 전송합니다.

            console.log('백엔드로 데이터를 전송합니다', user)
            alert('저장완료')
        }
    }

    //저장 버튼 클릭 이벤트 핸들러
    const handleSave = () => {
        //user데이터를 백엔드로 전송합니다.
        console.log('백엔드로 데이터를 전송합니다', user)
        alert('저장완료')
    }

    //초기화 버튼 클릭 이벤트 핸들러
    const handleInit = () => {
        setUser({
            email: '',
            password: '',
            userName: '',
        })
    }

    return (
        <div>
            <h1>회원가입-참조타입(객체-배열) 데이터 바인딩</h1>
            {/* 
            step2: 화면 UI요소를 정의한다.  
            객체 데이터 바인딩시 해당 UI요소의 name속성값을 반드시 데이터바인딩 객체의 속성값과 동일하게 지정합니다.
            name=데이터 바인딩 속성값을 지정함으로서 이벤트가 발생한 UI요소가 바인딩될 데이터 속성이 무엇인지 판단할수있다.
            */}
            메일주소:
            <input type="text" placeholder="메일주소" name="email" value={user.email} onChange={handleUser} />
            <br />
            <br />
            암호:
            <input type="password" placeholder="암호" name="password" value={user.password} onChange={handleUser} />
            <br />
            <br />
            이름:
            <input
                type="text"
                placeholder="이름"
                name="userName"
                value={user.userName}
                onChange={handleUser}
                onKeyDown={handleEnterSave}
            />
            <br />
            <br />
            <hr></hr>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleInit}>초기화</button>
        </div>
    )
}

export default ReferTypeEvent
