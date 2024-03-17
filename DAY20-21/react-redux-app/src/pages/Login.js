import React, { useState } from "react";

//redux전역데이터 공간에 데이터를 반영하려면 useDispatch라는 훅을 참조합니다.
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

//redux 전역공간에 데이터를 반영하려면 반드시 액션함수를 참조해야합니다.
//리덕스 폴더안에 액션통합모듈을 참조하고 관련 액션함수(userLogin)를 참조합니다.
import { userLogin } from "../redux/actions";

import axios from "axios";

const Login = () => {
  //전역 데이터 반영을 위한 useDispatch 훅 변수 생성하기
  const globalDispatch = useDispatch();

  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });

  const onChangeLogin = (ev) => {
    setLogin({ ...login, [ev.target.name]: ev.target.value });
  };

  //로그인 처리 이벤트 처리함수
  const onLogin = (e) => {
    //axios로 백엔드 로그인 RESTful API 호출하기
    axios
      .post("http://localhost:3005/api/member/login", login)
      .then((res) => {
        console.log("로그인 결과값 확인11:", res.data);

        //웹브라우저 로컬스토리지에 저장하는 방법 안내
        window.localStorage.setItem("token", res.data.token);

        //리덕스 전역데이터 저장소(store)에 토큰/로그인사용자 정보 저장
        if (res.data.code === "200") {
          globalDispatch(
            userLogin(res.data.data.token, res.data.data.loginUser)
          );

          //axio의 디폴트 사용자 인증 토큰값 바인딩 처리해주기-이후 토큰을 매번 axios에서 전달안해도 됨
          //axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.data.token;

          //로그인한 사용자의 프로필 페이지로 이동시키기
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error("백엔드 호출 에러발생");
      });

    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        메일주소:
        <input name="email" value={login.email} onChange={onChangeLogin} />
        <br />
        암호:
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={onChangeLogin}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
