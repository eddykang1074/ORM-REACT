import React from 'react'

const ThirdComponent = (props) => {
    return (
        <div>
            <h1>세번쨰 뎁스 자식 컴포넌트</h1>
            사용자 명: {props.name}
        </div>
    )
}

export default ThirdComponent
