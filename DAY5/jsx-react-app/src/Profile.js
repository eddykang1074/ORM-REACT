import React from 'react'
import Child1 from './ThirdComponent'

//Props속성의 필수입력여부 또는 데이터 타입 유효성 검사 기능제공
import PropTypes from 'prop-types'

const Profile = (props) => {
    return (
        <div>
            <h1>{props.children}</h1>
            아이디:{props.userid}
            <br />
            이름:{props.name}
            <br />
            메일주소:{props.email}
            <br />
            전화번호:{props.telephone}
            <br />
            나이:{props.age}
        </div>
    )
}

// const Profile = ({ children, userid, name, email, telephone, address,age }) => {
//     return (
//         <div>
//             <h1>{children}-NoProps</h1>
//             아이디:{userid}
//             <br />
//             이름:{name}
//             <br />
//             메일주소:{email}
//             <br />
//             전화번호:{telephone}
//             <br />
//             <Child1 name={name}></Child1>
//             거주지: {address}
//             나이: {age}
//         </div>
//     )
// }

Profile.defaultProps = {
    address: '경기도 성남시',
}

//부모에서 전달되는 또는 디폴트 프롭스에서 정의된 각종 PROPS 속성들의 유효성검사 로직 적용하기
Profile.propTypes = {
    age: PropTypes.number.isRequired,
    userid: PropTypes.string.isRequired,
}

export default Profile
