import React from "react";

//useParams 훅을 이용해 손쉽게 URL을 통해 파라메터 방식으로 전달되는
//데이터를 추출할수 있습니다.
import { useSearchParams } from "react-router-dom";

const ArticleDetail = () => {
  //여러개의 키와 값이 존재할수 있으므로  searchParams에 여러개의 값이 전달됩니다.
  const [searchParams, setSearchParams] = useSearchParams();

  const aidx = searchParams.get("aidx");
  const stock = searchParams.get("stock");

  return (
    <div>
      <h1>게시글 상세 정보 웹페이지</h1>
      <h3>추출된 쿼리스트링 값 aidx = {aidx}</h3>
      <h3>추출된 쿼리스트링 값 stock = {stock}</h3>
    </div>
  );
};

export default ArticleDetail;
