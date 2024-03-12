//게시글 정보처리 전용 RESTAPI 라우터 파일

var express = require("express");
var router = express.Router();

//db프로그래밍을 위한 ORM db객체 참조
var db = require("../models/index");

/* 
-게시글 목록 조회 REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/articles
-호출방식: GET
-반환값:
*/
router.get("/articles", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    // var articles = await db.Article.findAll({
    //   attributes: [
    //     "article_id",
    //     "board_type_code",
    //     "title",
    //     "article_type_code",
    //     "contents",
    //     "view_count",
    //     ["", "ischecked"],
    //   ],
    // });

    var articles = await db.Article.findAll();

    apiResult.code = "200";
    apiResult.data = articles;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
-신규 게시글 등록처리  REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/articles
-호출방식: POST
-반환값:
*/
router.post("/articles", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    //게시글 제목 과 내용을 추출합니다.
    var title = req.body.title;
    var contents = req.body.contents;

    var article = {
      board_type_code: 1,
      title,
      article_type_code: 1,
      contents,
      view_count: 0,
      ip_address: "111.111.111.222",
      is_display_code: req.body.is_display_code,
      reg_date: Date.now(),
      reg_member_id: 1,
    };

    var dbArticle = await db.Article.create(article);

    apiResult.code = "200";
    apiResult.data = dbArticle;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
-기존 게시글 수정처리 REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/articles/1
-호출방식: POST
-반환값:
*/
router.post("/articles/:aid", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    //게시글 고유번호 추출하기
    var articleId = req.params.aid;

    //게시글 제목 과 내용을 추출합니다.
    var title = req.body.title;
    var contents = req.body.contents;

    var article = {
      title,
      contents,
      is_display_code: req.body.is_display_code,
      ip_address: "111.111.111.222",
      edit_date: Date.now(),
      edit_member_id: 1,
    };

    var affectedCnt = await db.Article.update(article, {
      where: { article_id: articleId },
    });

    apiResult.code = "200";
    apiResult.data = affectedCnt;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
-단일 게시글 정보 조회 REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/articles/1
-호출방식: GET
-반환값:
*/
router.get("/articles/:aid", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    //게시글 고유번호 추출하기
    var articleId = req.params.aid;

    //단일 게시글 정보 조회
    var article = await db.Article.findOne({
      where: { article_id: articleId },
    });

    apiResult.code = "200";
    apiResult.data = article;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

/* 
-단일 게시글 정보 삭제처리  REST API 라우팅 메소드 
-호출주소: http://localhost:3005/api/articles/1
-호출방식: DELETE
-반환값:
*/
router.delete("/articles/:aid", async (req, res, next) => {
  var apiResult = {
    code: "",
    data: {},
    result: "",
  };

  try {
    var articleId = req.params.aid;
    var affectedCnt = await db.Article.destroy({
      where: { article_id: articleId },
    });

    apiResult.code = "200";
    apiResult.data = affectedCnt;
    apiResult.result = "Ok";
  } catch (err) {
    apiResult.code = "500";
    apiResult.data = null;
    apiResult.result = "Failed";
  }

  res.json(apiResult);
});

module.exports = router;
