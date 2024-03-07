//redux/reducers.js파일의 목적은 업무별 폴더에 있는 각종 reducer.js파일을 통합해주는 역할제공
//각종 리듀서 파일에서 노출되는 리듀서함수를 통합해주는 기능제공..

//redux패키지의 combineReducers를 통해 리듀서파일에서 제공하는 리듀서함수를 통합할수있다.
import { combineReducers } from "redux";

//각종 업무별 리듀서 파일에서 제공하는 리듀서함수를 참조합니다.
import Todo from "./todo/reducer";

import Auth from "./auth/reducer";

//combineReducers를 이용해 각종 리듀서함수를 통합해줍니다.
export default combineReducers({ Todo, Auth });

//export default combineReducers({Todo,UserLogin});
