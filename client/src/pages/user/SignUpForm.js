import { useRef, useState } from "react";
import $ from "react";
import axios from "axios";
import port from "./../../data/port.json";
const SignUpForm = ({ signUpData, onChangeSignUpData, setSignUpData }) => {
  const emailRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  // //비밀번호 유효성 검사
  // const checkPassword = (e) => {
  //   //  8 ~ 10자 영문, 숫자 조합
  //   var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
  //   // 형식에 맞는 경우 true 리턴
  //   console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
  // };

  // // 이메일 유효성 검사
  // const checkEmail = (e) => {
  //   var regExp =
  //     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  //   // 형식에 맞는 경우 true 리턴
  //   console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
  // };

  const onClickSignUpButton = () => {
    if (signUpData.email === "") {
      alert("이메일 입력해주세요");
      emailRef.current.focus();
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
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  return (
    <div className="album">
      <div className="container">
        <form>
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
  );
};

export default SignUpForm;
