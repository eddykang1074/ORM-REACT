import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  const navigate = useNavigate();

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
          name="password"
          value={user.password}
          onChange={onChangeEntry}
        />
        <br />
        이름:
        <input name="name" value={user.name} onChange={onChangeEntry} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
