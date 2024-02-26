import React, { useState } from "react";

//useHistory훅을 참조해서 개발자가 원하는 라우팅주소 URL을 호출해서 해당 컴포넌트를 렌더링시킨다.
import { useNavigate } from "react-router-dom";

const ArticleRegist = () => {
  const [article, setArticle] = useState({ title: "", contents: "" });

  //useHistory 생성하기
  const navigate = useNavigate();

  const onArticleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  //게시글 신규 정보 저장처리 하기
  const onSave = () => {
    //STEP1:RESTful API를 호출해서 단일 게시글 정보를 백엔드를 통해 등록처리한다.
    //STEP2:데이터 처리 완료후 특정 URL로 컨텐츠 페이지를 이동시킨다.
    //프로그래밍 방식으로 리액트 페이지를 이동시킬떄 사용한다.

    //navigate("/");
    navigate("/product/category/500");
  };

  return (
    <div>
      <h1>게시글 등록 웹페이지</h1>
      제목:
      <input name="title" value={article.title} onChange={onArticleChange} />
      <br />
      내용:
      <textarea named="contents" onChange={onArticleChange}>
        {article.cotents}
      </textarea>
      <button onClick={onSave}>저장</button>
    </div>
  );
};

export default ArticleRegist;
