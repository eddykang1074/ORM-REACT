import useSWR, { mutate } from "swr";

//get타입의 기본 데이터 조회 전용 fetch함수 정의
const getFetcher = (url: string) => fetch(url).then((res) => res.json());

//로그인 전용 Fetcher
// const postLoginFetcher = async (url: string, member?: any) => {
//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(member),
//   });
//   return response.json();
// };

//백엔드 API 호출하고 SWR훅으로 값을 반환해주는 전용 개발자 훅함수 정의하기
//SWR기반 데이터 통신 전용 훅함수 정의
const useBlogDetail = (blogId: string) => {
  const { data, error, isLoading } = useSWR<any>(
    `http://localhost:3005/api/articles/${blogId}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
};

//로그인 훅
// const useLogin = (member: any) => {
//   const { data, error, isLoading } = useSWR<any>(
//     `http://localhost:3005/api/member/`,
//     postLoginFetcher(blogId, member)
//   );

//   return {
//     data: data,
//     error: error,
//     isLoading: isLoading,
//   };
// };

export default useBlogDetail;
