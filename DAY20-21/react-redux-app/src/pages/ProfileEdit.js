import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";

const ProfileEdit = (props) => {
  const navigate = useNavigate();

  //DB에서 가져온 사용자 데이터
  const [user, setUser] = useState({});

  //최초 컴포넌트 렌더링시에만 백엔드에서 로그인 사용자 정보조회/바인딩 처리하기
  useEffect(() => {
    console.log("토큰정보1 ", props.token);

    axios
      .get("http://localhost:3005/api/member/profile", {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((res) => {
        console.log("토큰정보2 ", props.token);
        console.log("로그인 사용자 정보 출력", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("백엔드에러발생", err);
      });
  }, []);

  //회원가입 이벤트 처리 함수
  const onEntry = (e) => {
    //axios로 회원가입 처리 RESTAPI를 호출해서 회원가입 처리합니다.

    //프론트엔드 데이터 바인딩 속성과 백엔드 RESTFul전달데이터 구조와 속성명이
    //다를경우 아래과 같이 백엔드 수신 데이터 구조와 동일한 json데이터를 정의하고
    //프론트엔드에서의 값으로 데이터를 맞춰준 다음 백엔드로 전달한다.
    const entryData = {
      email: user.email,
      password: user.password,
      name: user.name,
    };

    axios
      .post("http://localhost:3005/api/member/entry", entryData)
      .then((res) => {
        console.log("회원가입 결과값:", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error("백엔드 호출 에러발생...");
      });

    e.preventDefault();
  };

  //회원정보 데이터 바인딩 처리 함수
  const onChangeEntry = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={onEntry}>
        메일주소:
        <input name="email" value={user.email} onChange={onChangeEntry} />
        <br />
        암호:
        <input
          type="password"
          name="member_password"
          value={user.member_password}
          onChange={onChangeEntry}
        />
        <br />
        이름:
        <input name="name" value={user.name} onChange={onChangeEntry} />
        <br />
        <button type="submit">프로필수정</button>
      </form>
    </div>
  );
};

//connect(mapStateToProps, mapDispatchToProps)(Home);
//mapStateToProps함수의 용도는 리덕스 전역상태공간에 저장된 특정 전역 데이터 (Layout) 값을 가져와
//현재 컴포넌터의 props의 하위속성으로 값을 제공합니다.
//mapDispatchToProps는 전역공간의 특정 상태값을 변경해주는 액션함수를 현재 컴포넌트의 props에 하위속성으로 제공합니다.

//전역데이터를 해당 컴포넌트의 props속성으로 제공하는 기능제공
//state는 전역데이터 저장소를 의미
const mapStateToProps = (state) => {
  const { token, loginUser } = state.Auth;
  return { token, loginUser };
};

export default connect(mapStateToProps)(ProfileEdit);
