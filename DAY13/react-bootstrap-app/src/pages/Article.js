import React from "react";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <div className="board-wrapper">
      <div className="row mb-1">
        <div className="col">
          <h5>게시글 작성</h5>
        </div>
      </div>

      <form>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">글제목</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="글제목" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">글내용</label>
          <div className="col-sm-10">
            <textarea className="form-control" rows="10"></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">게시여부</label>
          <div className="col-sm-10">
            <select className="form-control">
              <option>게시</option>
              <option>게시안함</option>
            </select>
          </div>
        </div>
        <div className="row text-center">
          <div className="col">
            <button className="btn btn-primary">등록</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Article;
