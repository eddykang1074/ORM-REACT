var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//dotenv 어플리케이션 환경설정관리 팩키지 참조 및 구성하기 
require('dotenv').config();


//CORS 지원위해 패키지참조 
const cors = require("cors");

var sequelize = require('./models/index.js').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//게시글 정보처리 전용 RESTAPI 라우터파일 참조 
var articleAPIRouter = require('./routes/articleAPI');


//회원정보 데이터 처리 전용 RESTAPI 라우터 참조
var memberAPIRouter = require('./routes/memberAPI');



var app = express();

//MYSQL과 자동 연결 처리 및 모델 기반 물리 테이블 생성 처리 제공
sequelize.sync(); 


//모든 호출 허락
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api', articleAPIRouter);

//회원정보처리 전용 RESTAPI라우터의 기본호출주소 체계 정의 
//http://localhost:3005/api/member
app.use('/api/member', memberAPIRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
