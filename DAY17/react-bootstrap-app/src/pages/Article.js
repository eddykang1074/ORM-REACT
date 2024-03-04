import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";

const Article = () => {
  //단일게시글 정보 구조 정의 및 초기 데이터 정의
  const [article, setArticle] = useState({
    title: "",
    contents: "",
    is_display_code: 1,
  });

  //모달 팝업 오픈제어 상태값 정의하기
  const [modal, setModal] = useState(false);

  //모달 팝업 유효성 검사 메시지
  const [validationText, setValidationText] = useState("");

  //초기 페이지 렌더링시 마우스 포커스 처리를 위한 useRef정의하기
  const refTitle = useRef();

  //페이지 이동을 위한 navigate 훅생성하기
  const navigate = useNavigate();

  //최초 로딩시 제목 입력박스에 마우스 포커스 주기
  useEffect(() => {
    refTitle.current.focus();
  }, []);

  //입력요소 데이터 바인딩 처리
  const onArticleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  //저장 버튼 클릭시 데이터 저장 처리후 게시글 목록으로 이동처리하기
  const onArticleSubmit = (e) => {
    if (article.title == "") {
      setValidationText("제목을 입력해주세요.");
      //alert("제목을 입력해주세요.");
      setModal(true);
      refTitle.current.focus();
      e.preventDefault();
      return false;
    }

    //게시글 백엔드 데이터 처리하기
    // axios
    //   .post("http://localhost:3005/api/articles", article)
    //   .then((res) => {
    //     console.log("데이터 처리결과값:", res.data);

    //     if (res.data.code == "200") {
    //       alert("등록완료");

    //       //게시글 목록으로 이동처리
    //       navigate("/articles");
    //     } else {
    //       alert("등록실패");
    //     }
    //   })
    //   .catch((err) => {});

    insertArticle();

    //Submit이벤트가 전파되어 폼을 재로딩하는것을 방지처리합니다.
    e.preventDefault();
  };

  //익명함수 구현
  const insertArticle = async () => {
    //async/await방식으로 구현하는 경우 예외처리를 적용하세요.
    try {
      const res = await axios.post(
        "http://localhost:3005/api/articles",
        article
      );
      console.log("백엔드에서 전달된 데이터 값 확인하기22222", res);
      //게시글 목록으로 이동처리
      navigate("/articles");
    } catch (err) {
      console.error(err);
    }
  };

  //모달팝업 제어 핸들러
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="article-wrapper">
      <div className="row mb-3">
        <div className="col">
          <h4>게시글 작성</h4>
        </div>
      </div>

      <form onSubmit={onArticleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">제목</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="title"
              ref={refTitle}
              className="form-control"
              value={article.title}
              onChange={onArticleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">내용</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="contents"
              rows="10"
              value={article.contents}
              onChange={onArticleChange}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">게시여부</label>
          <div className="col-sm-10">
            <select
              className="form-control"
              name="is_display_code"
              value={article.is_display_code}
              onChange={onArticleChange}
            >
              <option value={1}>게시</option>
              <option value={0}>게시안함</option>
            </select>
          </div>
        </div>

        <div className="row text-center">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              저장
            </button>
          </div>
        </div>
      </form>

      {/* <Button color="danger" onClick={toggleModal}>
        Click Me
      </Button> */}

      <Modal isOpen={modal}>
        <ModalHeader>유효성검사</ModalHeader>
        <ModalBody>{validationText}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            확인
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Article;
