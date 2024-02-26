import React from "react";

//useParams 훅을 이용해 손쉽게 URL을 통해 파라메터 방식으로 전달되는
//데이터를 추출할수 있습니다.
import { useParams } from "react-router-dom";

const Category = () => {
  //사용자 요청 URL에 와일드카드 idx값이 있는경우 해당 값 추출하기
  const { idx } = useParams();

  return (
    <div>
      <h1>분류별 상품 목록 보기 페이지</h1>
      <h3>추출된 파라메터 값 idx = {idx}</h3>
    </div>
  );
};

export default Category;
