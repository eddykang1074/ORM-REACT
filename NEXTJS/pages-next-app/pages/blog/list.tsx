import Link from "next/link";
import React, { useEffect, useState } from "react";

//nextjs에서 제공해주는  SSR,SSR 지원 타입 참조하기
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

//api조회 결과값 형 선언
type APIResult = {
  code: string;
  data: Article[];
  result: string;
};

type Article = {
  article_id?: number;
  board_type_code?: number;
  article_type_code?: number;
  title: string;
  contents: string;
  view_count?: number;
  ip_address?: string;
  is_display_code: number;
  reg_date?: string;
  reg_member_id?: number;
  edit_date?: string | null;
  edit_member_id?: number | null;
};

export default function List({
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //테스트용으로 클라이언트에서 화면이 최초 렌더링 될떄
  //client data fetching을 이용해 백엔드 API에서 데이터를 불러와 데이터바인딩 해본다.
  //CSR방식으로 SSR을 함꼐 사용하는 예시용...
  const [article, setArticle] = useState<Article>({
    title: "",
    contents: "",
    is_display_code: 1,
  });

  //서버에서 데이터를 포함한 화면이 최초로 웹브라우저 화면에 렌더링될떄(CSR)를 감지해서
  //단일게시글 정보를 가져와 바인딩한다.
  useEffect(() => {
    //단일 게시글 정보 조회 client fetching...
    const getSingleBlog = async () => {
      const res = await fetch("http://localhost:3005/api/articles/13", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      const article: Article = result.data;

      console.log("CSR CLIENT FETCHING....", result, article);

      if (result.code == "200") {
        setArticle(article);
      }
    };

    getSingleBlog();
  }, []);

  return (
    <div>
      <h1>블로그 목록 페이지</h1>
      <div>
        대시보드 페이지 제목 : {article.title}
        <table className="table-auto">
          <thead>
            <tr>
              <th>글번호</th>
              <th>글제목</th>
              <th>조회수</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((article, index) => (
              <tr key={index}>
                <td>{article.article_id}</td>
                <td>{article.title}</td>
                <td>{article.view_count}</td>
                <td>{article.reg_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//해당 Client Component에서 SSR(Server Side Rendering)을 처리해주는 비동기함수(next.js)
export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:3005/api/articles");
  const result: APIResult = await res.json();
  console.log("getServerSideProps====>", result);
  return { props: { result } };
}) satisfies GetServerSideProps<{ result: APIResult }>;
