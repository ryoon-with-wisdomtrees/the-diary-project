import { useEffect, useRef, useState } from "react";
import $ from "react";
import axios from "axios";
import port from "./../../data/port.json";
import { useCookies } from "react-cookie";
const SocialSignup = () => {
  const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies("auth");
  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  useEffect(() => {
    console.log("k-쿠키");
    console.log(cookiesAuth);

    setSignUpData({
      ...signUpData,
      email: cookiesAuth.auth.kakao_account.email,
      name: cookiesAuth.auth.kakao_account.profile.nickname,
    });

    console.log(signUpData);
  }, []);

  const onChangeSignUpData = (e) => {
    console.log("onChangeSignUpData");
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSignUpButton = () => {
    //비동기 처리
    if (signUpData.email === "") {
      alert("이메일 입력해주세요");

      return;
    } else if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요");
      $("#password").focus();
      return;
    } else if (signUpData.rePassword === "") {
      alert("rePassword를 입력해주세요");
      $("#rePassword").focus();
      return;
    } else if (signUpData.name === "") {
      alert("name를 입력해주세요");
      $("#name").focus();
      return;
    } else if (signUpData.password !== signUpData.rePassword) {
      alert("비밀번호를 확인해주세요");
      setSignUpData({
        ...setSignUpData,
        password: "",
        rePassword: "",
      });

      $("#password").focus();
      return;
    }
    sendSignUpData()
      .then((res) => {
        console.log(res.data);
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpData = async () => {
    console.log("sendSignUpData");
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Kakao SignUp Page</h1>
            <p className="lead text-muted">
              <br />
              회원가입을 완료해주세요.
            </p>
          </div>
        </div>
      </section>

      <div className="album">
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
                type="text"
                value={signUpData.name}
                onChange={onChangeSignUpData}
                className="form-control"
                name="name"
                id="name"
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                ref={emailRef}
                value={signUpData.email}
                onChange={onChangeSignUpData}
                className="form-control"
                name="email"
                id="email"
                aria-describedby="emailHelp"
                readOnly
                disabled
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={signUpData.password}
                onChange={onChangeSignUpData}
                className="form-control"
                name="password"
                id="password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rePassword" className="form-label">
                rePassword
              </label>
              <input
                type="password"
                value={signUpData.rePassword}
                onChange={onChangeSignUpData}
                className="form-control"
                name="rePassword"
                id="rePassword"
              />
            </div>

            <div className="mb-3">
              <p className="text-danger">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={onClickSignUpButton}
              className="btn btn-primary"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SocialSignup;
