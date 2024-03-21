import React from "react";
import Head from "next/head";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>{data.data.title}</title>
        <meta name="description" content={data.data.title} />
        <meta name="keywords" content={data.data.title} />
        <meta name="author" content={data.data.title} />
      </Head>

      <div>
        <h1>웹사이트 방문을 환영합니다.</h1>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3005/api/articles/13");
  const data = await res.json();
  console.log("백엔드에서 전달된 데이터 확인:", data);
  return {
    props: {
      data: data,
    },
  };
}
