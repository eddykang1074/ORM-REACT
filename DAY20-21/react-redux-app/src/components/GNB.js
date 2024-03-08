import React from "react";
import { Link } from "react-router-dom";

const GNB = () => {
  return (
    <div style={{ width: "100%", height: "50px", backgroundColor: "gray" }}>
      <span>
        <Link to="/">홈</Link>
      </span>
      |
      <span>
        <Link to="/entry">회원가입</Link>
      </span>
      |
      <span>
        <Link to="/login">로그인</Link>
      </span>
      |
      <span>
        <Link to="/login3">로그인3</Link>
      </span>
      |
      <span>
        <Link to="/profile">프로필</Link>
      </span>
      |
      <span>
        <Link to="/profile2">프로필2</Link>
      </span>
      |
      <span>
        <Link to="/profile/edit">프로필수정</Link>
      </span>
    </div>
  );
};

export default GNB;
