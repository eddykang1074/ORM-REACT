"use client";

import React, { useState, useEffect } from "react";

//게시글 등록이후 페이지 이동을 위한 navigate참조하기
import { useRouter } from "next/navigation";

export default function BlogCreate() {
  //naviate객체
  const router = useRouter();

  const [article, setArticle] = useState({
    title: "",
    contents: "",
    is_display_code: 1,
  });

  const onBlogChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const onBlogSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const response = await fetch("http://localhost:3005/api/articles", {
        method: "POST",
        headers: {
          //Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //fetch API 호출결과
      const result = await response.json();
      console.log("처리결과 데이터:", result);
      if (result.code == "200") {
        //특정 URL페이지로 이동시키기
        router.push("/blog/list");
      }
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  };

  return (
    <div>
      <form onSubmit={onBlogSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              게시글 작성
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              게시글을 작성해주세요.
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
        </div>
      </form>
    </div>
  );
}
