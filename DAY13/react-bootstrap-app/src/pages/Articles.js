import React from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <div className="board-wrapper">
      <div className="row mb-1">
        <div className="col">
          <h5>게시글 목록</h5>
        </div>
        <div className="col">
          <Link className="btn btn-primary float-end p-1" to="/article">
            글작성
          </Link>
        </div>
      </div>

      <table className="table table-striped table-hover text-center">
        <thead>
          <tr>
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">조회수</th>
            <th scope="col">글쓴이</th>
            <th scope="col">등록일시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>글제목입니다.</td>
            <td>1</td>
            <td>강창훈</td>
            <td>2024.03.01</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>글제목입니다.</td>
            <td>1</td>
            <td>강창훈</td>
            <td>2024.03.01</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>글제목입니다.</td>
            <td>1</td>
            <td>강창훈</td>
            <td>2024.03.01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
