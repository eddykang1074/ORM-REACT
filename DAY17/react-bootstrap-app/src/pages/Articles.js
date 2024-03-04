import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import moment from "moment";

//백엔드 RESTFul통신을 위한 axios 참조하기
import axios from "axios";

const Articles = () => {
  //navigate훅 생성하기
  const navigate = useNavigate();

  //게시글 목록 데이터 상태 구조 정의하기
  const [articleList, setArticleList] = useState([]);

  //최초 화면렌더링시에 백엔드 게시글 목록 조회/바인딩하기
  useEffect(() => {
    console.log("최초 화면렌더링시에 호출됩니다111111.");

    //콜백방식 axios 비동기 방식 데이터 호출 처리방법 1
    //콜백방식으로 axios를 구현하는 경우 가독성이 떨어지고 후행로직이 있는경우 Callback지옥이 재현된다.
    //axios 비동기 통신 콜백지옥문제를 해결하기 위해서는 주로 promise방식보다는 async/await방식을 통해 구현한다.
    // axios
    //   .get("http://localhost:3005/api/articles")
    //   .then((res) => {
    //     console.log("백엔드에서 전달된 데이터 목록22222:", res);

    //     //정상적인 API호출이면 백엔드 게시글 목록배열을 해당 상태값으로 변경해준다.
    //     if (res.data.code == "200") {
    //       //백엔드 데이터로 데이터 바인딩 처리하기
    //       setArticleList(res.data.data);
    //     } else {
    //       console.log("백엔드 호출 에러발생...", res.data.result);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("백엔드 호출 에러발생...", err);
    //   });
    //

    //async 비동기 함수 호출하기
    getArticles();

    console.log("데이터 조회 처리와 상관없는 로직/화면 기능 구현 3333.");
  }, []);

  //비동기 함수 구현1
  async function getArticles() {
    //async/await방식으로 구현하는 경우 예외처리를 적용하세요.
    try {
      const res = await axios.get("http://localhost:3005/api/articles");
      console.log("백엔드에서 전달된 데이터 값 확인하기22222", res);
      setArticleList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  //익명함수 구현2
  const getArticles2 = async () => {
    //async/await방식으로 구현하는 경우 예외처리를 적용하세요.
    try {
      const res = await axios.get("http://localhost:3005/api/articles");
      console.log("백엔드에서 전달된 데이터 값 확인하기22222", res);
      setArticleList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="article-wrapper">
      <div className="row mb-2">
        <div className="col">
          <h4>게시글목록</h4>
        </div>
        <div className="col">
          {/* <button
            className="btn btn-primary float-end"
            onClick={() => navigate("/article")}
          >
            글작성
          </button> */}

          <Link className="btn btn-primary float-end" to="/article">
            글작성
          </Link>
        </div>
      </div>

      <table className="table table-striped table-hover text-center">
        <thead>
          <tr>
            <th scope="col">글순번</th>
            <th scope="col">제목</th>
            <th scope="col">조회수</th>
            <th scope="col">게시여부</th>
            <th scope="col">등록일시</th>
          </tr>
        </thead>
        <tbody>
          {articleList.length > 0 ? (
            articleList.map((item, index) => (
              <tr key={item.article_id}>
                <th scope="row">{item.article_id}</th>
                <td>
                  <Link to={{ pathname: "/article/" + item.article_id }}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.view_count}</td>
                <td>{item.is_display_code === 1 ? "게시" : "게시안함"}</td>
                <td>{moment(item.reg_date).format("yyyy-MM-DD HH:mm")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>게시글이 존재하지 않습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
