import React, { useState } from 'react'

const PrimitiveTypeEvent = () => {
    //메일주소/암호/사용자명 회원가입 데이터를 원시타입을 개별적으로 정의하고 초기값을 할당합니다.
    //STEP1: 데이터의 구조를 정의하고 초기값을 할당한다.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleName = (e) => {
        setUserName(e.target.value)
    }

    const handleSave = () => {
        //사용자 데이터를 생성하고 백엔드로 전송한다.
        var user = {
            email: email,
            password: password,
            userName: userName,
        }

        console.log('백엔드로 데이터를 전송합니다', user)
        alert('저장완료')
    }

    const handleInit = () => {
        setEmail('')
        setPassword('')
        setUserName('')
    }

    //이름입력요소에서 엔터키 발생시 감지해서 저장처리하기
    const handleEnterSave = (e) => {
        console.log('사용자 키보드 이벤트 값 표시하기:', e.keyCode)

        //키보드 엔터키 눌림시 이벤트 캐치하기
        if (e.keyCode === 13) {
            console.log('엔터키가 선택되었습니다. ')
            var user = {
                email: email,
                password: password,
                userName: userName,
            }

            console.log('백엔드로 데이터를 전송합니다', user)
            alert('저장완료')
        }
    }

    return (
        <div>
            <h1>회원가입-원시타입 데이터 바인딩</h1>
            {/* step2: 화면 UI요소를 정의한다.  */}
            메일주소:
            <input type="text" placeholder="메일주소" value={email} onChange={handleEmail} />
            <br />
            <br />
            암호:
            <input type="password" placeholder="암호" value={password} onChange={handlePassword} />
            <br />
            <br />
            이름:
            <input type="text" placeholder="이름" value={userName} onChange={handleName} onKeyDown={handleEnterSave} />
            <br />
            <br />
            <hr></hr>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleInit}>초기화</button>
        </div>
    )
}

export default PrimitiveTypeEvent
