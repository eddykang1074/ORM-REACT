import React, { useState, useRef, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  //단일게시글 정보 구조 정의 및 초기 데이터 정의
  const [article, setArticle] = useState({
    title: "",
    contents: "",
    is_display_code: 1,
  });

  //URL라우팅 주소에서 게시글 고유번호 추출하기
  const { aid } = useParams();
  console.log("파라메터 변수 값 출력하기:", aid);

  //초기 페이지 렌더링시 마우스 포커스 처리를 위한 useRef정의하기
  const refTitle = useRef();

  //페이지 이동을 위한 navigate 훅생성하기
  const navigate = useNavigate();

  //최초 로딩시 제목 입력박스에 마우스 포커스 주기
  useEffect(() => {
    console.log("최초 화면 컴포넌트가 렌더링 됩니다..111111111");

    //단일 게시글 정보 조회 바인딩하기
    //Axios는 백엔드 RESTful과 통신시 기본 비동기 통신을 합니다.
    //백엔드 호출후 결과값이 전달되면 than콜백함수에서 처리하며
    //Axios호출이후 프로세스가 있다면  이후 프로세스가 먼저실행됩니다.
    axios
      .get(`http://localhost:3005/api/articles/${aid}`)
      .then((res) => {
        console.log("백엔드 데이터 조회결과가 반환되었습니다. ..22222222");
        console.log("단일 게시글 조회정보 출력:", res);
        if (res.data.code == "200") {
          //단일 게시글 정보 바인딩 처리

          //Axios 비동기 통신 시 로직 처리 구현 주의사항
          //Axios 사용시 호출결과가 반환되고 반환된 결과 기반에서 추가 로직을 구현해야하는경우는
          //반드시 than 콜백함수 안에서 로직을 구현해야하고  axios블럭 밖에서 구현하면
          //axios가 기본 비동기 통신기반으로 작동하기 떄문에 axios결과가 반환되지 않았는데도 밖에 로직이 실행됩니다.
          setArticle(res.data.data);
          refTitle.current.focus();
        } else {
          console.log("백엔드 호출 에러발생:", res.data.result);
        }
      })
      .catch((err) => {});

    console.log("추가 로직이 호출되었습니다.. ..3333333333");
  }, []);

  //입력요소 데이터 바인딩 처리
  const onArticleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  //저장 버튼 클릭시 데이터 수정 처리후 게시글 목록으로 이동처리하기
  const onArticleSubmit = (e) => {
    if (article.title == "") {
      alert("제목을 입력해주세요.");
      refTitle.current.focus();
      e.preventDefault();
      return false;
    }

    //게시글 백엔드 데이터 수정 처리하기
    // axios
    //   .post(`http://localhost:3005/api/articles/${aid}`, article)
    //   .then((res) => {
    //     console.log("데이터 수정 처리결과값:", res.data);

    //     if (res.data.code == "200") {
    //       alert("수정완료");

    //       //게시글 목록으로 이동처리
    //       navigate("/articles");
    //     } else {
    //       alert("수정실패");
    //     }
    //   })
    //   .catch((err) => {});

    updateArticle();

    //Submit이벤트가 전파되어 폼을 재로딩하는것을 방지처리합니다.
    e.preventDefault();
  };

  //게시글 삭제처리 이벤트 처리 함수
  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      //백엔드 삭제 처리
      // axios
      //   .delete(`http://localhost:3005/api/articles/${aid}`)
      //   .then((res) => {
      //     console.log("삭제처리 결과:", res);

      //     if (res.data.code == "200") {
      //       alert("삭제 완료");
      //       navigate("/articles");
      //     }
      //   })
      //   .catch((err) => {});

      removeArticle();
    }
  };

  //익명함수 구현
  const updateArticle = async () => {
    //async/await방식으로 구현하는 경우 예외처리를 적용하세요.
    try {
      const res = await axios.post(
        `http://localhost:3005/api/articles/${aid}`,
        article
      );
      //게시글 목록으로 이동처리
      navigate("/articles");
    } catch (err) {
      console.error(err);
    }
  };

  const removeArticle = async () => {
    //async/await방식으로 구현하는 경우 예외처리를 적용하세요.
    try {
      const res = await axios.delete(
        `http://localhost:3005/api/articles/${aid}`,
        article
      );

      //게시글 목록으로 이동처리
      navigate("/articles");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="article-wrapper">
      <div className="row mb-3">
        <div className="col">
          <h4>게시글 정보확인</h4>
        </div>
      </div>

      <form onSubmit={onArticleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">제목</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="title"
              ref={refTitle}
              className="form-control"
              value={article.title}
              onChange={onArticleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">내용</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="contents"
              rows="10"
              value={article.contents}
              onChange={onArticleChange}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">게시여부</label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="is_display_code"
              value={article.is_display_code}
              onChange={onArticleChange}
            >
              <option value={1}>게시</option>
              <option value={0}>게시안함</option>
            </select>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              저장
            </button>
            <button type="button" className="btn btn-danger" onClick={onRemove}>
              삭제
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => navigate("/articles")}
            >
              목록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticleDetail;
