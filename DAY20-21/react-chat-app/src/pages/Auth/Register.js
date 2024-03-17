import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
} from "reactstrap";

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

const Register = () => {
  const navigate = useNavigate();

  //폼 유효성검사 및 폼데이터처리
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Input UserName"),
      email: Yup.string()
        .email("Enter proper email")
        .required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      //회원가입 처리 axios 기능 구현하기
      var memberData = {
        email: values.email,
        name: values.username,
        password: values.password,
      };

      axios
        .post("http://localhost:3005/api/member/entry", memberData)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.error("백엔드 호출에러 발생");
        });
    },
  });

  document.title = "신규 회원가입 페이지";

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img
                    src={logodark}
                    alt=""
                    height="30"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="30"
                    className="logo logo-light"
                  />
                </Link>

                <h4>Register</h4>
                <p className="text-muted mb-4">Get your Chatvia account now.</p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                      // return false;
                    }}
                  >
                    {/* {user && user ? (
                                            <Alert color="success">
                                                Register User Successfully
                                            </Alert>
                                        ) : null}

                                        {error && error ? (
                                            <Alert color="danger">
                                                <div>{error}</div>
                                            </Alert>
                                        ) : null} */}

                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <span className="input-group-text text-muted">
                          <i className="ri-mail-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          invalid={
                            formik.touched.email && formik.errors.email
                              ? true
                              : false
                          }
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormFeedback type="invalid">
                            {formik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Username</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-user-2-line"></i>
                        </span>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          invalid={
                            formik.touched.username && formik.errors.username
                              ? true
                              : false
                          }
                        />
                        {formik.touched.username && formik.errors.username ? (
                          <FormFeedback type="invalid">
                            {formik.errors.username}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <FormGroup className="mb-4">
                      <Label className="form-label">Password</Label>
                      <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                        <span className="input-group-text border-light text-muted">
                          <i className="ri-lock-2-line"></i>
                        </span>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          invalid={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <FormFeedback type="invalid">
                            {formik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <Button
                        color="primary"
                        block
                        className=" waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-muted mb-0">
                        By registering you agree to the Chatvia
                        <Link to="#" className="text-primary">
                          Terms of Use
                        </Link>
                      </p>
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Signin{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} hatvia. Crafted with
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
