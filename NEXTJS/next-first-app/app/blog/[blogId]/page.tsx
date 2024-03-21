"use client";

import React, { useState, useEffect } from "react";

//swr 훅 참조하기
//useSWR훅은 백엔드 API fetcher를 통해 가져온 데이터를 클라이언트에서 자동으로 캐시처리해주는 훅기능제공
//mutate 는 한번 가져온 데이터를 필요시 다시 가지고 오고 싶을떄 호출하는 기능제공
//화면이 재로딩되거나 부모 컴포넌트가 변경되어 해당화면이 재렌더링될떄..실행...
//SWR을 사용하는 주된이유: 백엔드 API호출시,특히 클라이언트 컴포넌트에서 웹브라우저에서 데이터 호출시 적극사용권장
//캐싱기능(백엔드에서 가져온데이터를 프론트엔드에 저장해두고 사용하는기능)
//재호출기능,포커스 추적기능,인터벌 기능(주기적으로 API를 호출한다),SUSPENS API 로딩 UI처리기능

import useSWR, { mutate } from "swr";

//게시글 등록이후 페이지 이동을 위한 navigate참조하기
import { useRouter } from "next/navigation";

//전역 개발자 정의 타입 참조하기
import { Article, IArticle } from "@/app/types/definitions";

//백엔드 통신 SWR 전용 데이터 훅 참조하기
import useBlogDetail from "@/app/api/blogAPI";

//fetcher함수 정의 : fetcher함수는 실질적으로 프론트엔드 백엔드 API를 호출해주는 함수
//useSWR훅은 기본적을 훅에서 지정된 전용 fetcher함수를 통해 백엔드에서 데이터를 처리합니다.
//fetcher는 웹브라우저에 탑재된 기본 fetch를 사용해도 되고 axios 같은 전용 ajax라이브러리를 사용해도 가능합니다.

//get방식으로 지정된 url을 통해 데이터를 가져오는 간략한 fetcher함수 정의
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

//단일 게시글 정보조회 전용 Fetcher 함수 구현
// const getArticleFetcher = async (url: string) => {
//   const response = await fetch(url, {
//     method: "GET",
//   });
//   return response.json();
// };

export default function BlogDetail(props: any) {
  //naviate객체
  const router = useRouter();

  //URL 게시글 고유번호 추출하기
  const articleId = props.params.blogId;

  const [article, setArticle] = useState<Article>({
    title: "",
    contents: "",
    is_display_code: 1,
  });

  //useEffect를 사용하지 않고 useSWR를 이용해 데이터를 가져와 클라이언트 환경에 캐시한다.
  //useSWR(키값=API주소, fetcher=백엔드API호출하고 데이터를 제공하는 실체함수,옵션설정값)
  //useSWR의 반환값형식(fetcher에의해 전달된 데이터,에러발생시 에러값,api호출진행상태)
  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:3005/api/articles/${articleId}`,
  //   getArticleFetcher
  // );

  const { data, error, isLoading } = useBlogDetail(articleId);

  //SWR데이터가 변경될떄마다 Setter함수를 통해 데이터변경처리
  useEffect(() => {
    if (data != undefined) {
      setArticle(data.data);
    }
  }, [data]);

  //에러발생시 표시할 UI요소 반환
  if (error) return <div>백엔드 호출에러 발생 UI제공</div>;

  //데이터 호출 대기시 UI표현 요소 반환(Suspense 대체)
  if (isLoading) return <div>Data Loading....</div>;

  const onBlogChange = (e: any) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  //SWR 기반 데이터 리로딩하기 - 캐시 다시 저장
  const onDataReload = () => {
    mutate(`http://localhost:3005/api/articles/${articleId}`);
    console.log("SWR mutate를 통해서 다시 데이터 조회하기", data);
  };

  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              게시글 내용 확인
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {data.data.title}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  글제목
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={onBlogChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  글내용
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="contents"
                    value={article.contents}
                    rows={3}
                    onChange={onBlogChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => router.push("/blog/list")}
          >
            목록
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>

          <button onClick={onDataReload}>재로딩하기</button>
        </div>
      </form>
    </div>
  );
}
