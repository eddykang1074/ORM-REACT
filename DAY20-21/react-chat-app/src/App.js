import React from 'react';

//메인 라우팅 파일을 참조한다.
import Routes from './routes';

//웹퍼블리싱 템플릿에서 제공되는 스타일파일 참조
import "./assets/scss/themes.scss";


function App() {
  return (<Routes/>);
}

export default App;
