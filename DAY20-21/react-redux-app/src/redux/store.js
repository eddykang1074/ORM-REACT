// import { configureStore } from "@reduxjs/toolkit";
// import reducers from "./reducers";

// const store = configureStore({
//   reducer: reducers,
//   devTools: true,
// });

// export default store;

//Saga환경을 지원하는 store구성 방식
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";

//업무별 saga파일 통합본 참조하기
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //기존 리덕스 스토어에 saga미들웨어 통합하기
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  //saga미들웨어 실행하기
  sagaMiddleware.run(sagas);
  return store;
}
