import logo from "./logo.svg";
import "./App.css";

//라우팅을 위한 Routes,Route객체를 참조합니다.
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
