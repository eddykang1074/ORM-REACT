import axios from "axios";
import config from "./../config";

//axios 패키지의 기본 백엔드 호출주소 환경 세팅하기
axios.defaults.baseURL = config.API_URL;

//백엔드 호출시 전달하는 데이터의 기본포맷지정
axios.defaults.headers.post["Content-Type"] = "application/json";

//axios객체를 통해 백엔드 결과값을 받았을때 에러처리 기본설정
axios.interceptors.response.use(
  function (response) {
    //백엔드에서 반환하는값이 response값으로 전달되게 조작(res.data를 안쓰게...)
    return response.data ? response.data : response;
  },
  function (error) {
    // 백엔드에서 에러가 반환된경우 에러에 대한 상세 처리로직 구현
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * axios에 header.Authorization에 JWT 사용자 인증토큰값을 초기 세팅해주는 함수
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

//리액트앱에서 각각의 화면에서 또는 모듈에서 axios 를 직접 사용하지 않고
//모든 프론트엔드영역에서는 axio를 사용시 APIClient를 이용해 axios통신을 하여 관리 및 개발의 효율성을 높인다.
class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    console.log("api call==========>", url, data);
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  /**
   * Delete
   */
  delete = (url) => {
    return axios.put(url);
  };
}

export { APIClient, setAuthorization };
