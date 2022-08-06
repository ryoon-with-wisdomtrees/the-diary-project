import React from "react";
import { useEffect, useState } from "react";
import SignInForm from "./user/SignInForm";
import SignUpForm from "./user/SignUpForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  //view를 변경하기 위한 유즈스테이트
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [view, setView] = useState({
    signIn: false,
    signUp: false,
  });

  // 로그인 입력받을 데이터 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  //회원가입 입력받을 데이터를 props로넘겨줌
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 상태일 때,/diary/home로 리다이렉트
  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);
  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">My Diary</h1>
            <p className="lead text-muted"></p>
            <p>
              <button
                onClick={() => {
                  setView({
                    signIn: true,
                    signUp: false,
                  });
                }}
                className="btn btn-primary my-2 m-1"
              >
                로그인
              </button>
              <button
                onClick={() => {
                  setView({
                    signIn: false,
                    signUp: true,
                  });
                }}
                className="btn btn-secondary my-2 m-1"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </section>
      {view.signIn ? (
        <SignInForm
          signInData={signInData}
          onChangeSignInData={onChangeSignInData}
        />
      ) : (
        <></>
      )}
      {view.signUp ? (
        <SignUpForm
          signUpData={signUpData}
          setSignUpData={setSignUpData}
          onChangeSignUpData={onChangeSignUpData}
        />
      ) : (
        <></>
      )}
    </main>
  );
};

export default Login;
