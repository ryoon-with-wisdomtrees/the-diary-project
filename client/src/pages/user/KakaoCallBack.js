import React, { useEffect } from "react";
import axios from "axios";
import url from "../../data/port.json";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const KakaoCallBack = () => {
  //kakao에서 redirect 해준 code 가져오는 부분
  const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userData"]);
  const [cookiesAuth, setCookieAuth] = useCookies(["auth"]);

  useEffect(() => {
    sendCodeParam()
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          //true면 로그인 돼 있는 상태.
          setCookie("userData", res.data, { path: "/" });
          // setCookie("loginTrue", "true", { path: "/" });
          navigate("/diary/home"); // 그냥 글 작성한 사람이던, 처음온 사람이던 이 페이지로
        } else {
          // 회원가입을 진행해야 하는 상태
          setCookieAuth("auth", res.data, { path: "/" });
          navigate("/oauth/signUp");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/"); //로그인쪽으로 리다이렉트.
      });
  }, []);

  const sendCodeParam = async () => {
    return await axios.get(url.url + `/auth/kakao`, {
      params: {
        code: KAKAO_PARAMS,
      },
    });
  };
};

export default KakaoCallBack;
