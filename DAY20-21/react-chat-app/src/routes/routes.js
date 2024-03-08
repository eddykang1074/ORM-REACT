//리액트 채팅앱의 모든 화면컴포넌트의 라우팅 규칙을 정의합니다.

import React from 'react';
import {Navigate} from 'react-router-dom';

//React.lazy()메소드 화면컴포넌트를 동적으로 렌더링하기 위해사용함.
//React.lazy(import(해당화면-페이지컴포넌트 지정))

//기정의된 페이지 컴포넌트를 참조합니다.

//사용자인증(로그인) 이 반드시 필요한 화면 페이지 컴포넌트 목록 참조 
//const StarterPage =  React.lazy(()=>import("../pages/Starter/Index"));
const StarterPage = React.lazy(() => import("../pages/Starter/Index"));
const Dashboard  = React.lazy(()=>import("../pages/Dashboard/Index"));


//사용자인증(로그인)이 필요없는, 로그인없이 볼수 있어야하는 화면 페이지 컴포넌트 
const Login = React.lazy(()=>import("../pages/Auth/Login"));
const Register = React.lazy(()=>import("../pages/Auth/Register"));


//인증이 필요한 라우팅 목록 및 라우팅 규칙정의 
const authProtectedRoutes = [
    {path:"/starter",component:<StarterPage/>}, //http://localhost:3000/starter
    {path:"/dashboard",component:<Dashboard/>}, //http://localhost:3000/dashboard
    {path:"/",exact:true,component:<Navigate to="/dashboard"/>},//http://localhost:3000/
];


//인증이 필요없는 라우팅 목록 및 라우팅 정의 
const publicRoutes = [
    {path:"/login",component:<Login/>}, //http://localhost:3000/login
    {path:"/register",component:<Register/>}, //http://localhost:3000/register
];


export {authProtectedRoutes,publicRoutes};