import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import kakaLoginButtonImg from "./../img/kakao_login_medium.png";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);

  console.log(cookies.userData);
  //--------------kakao oauth
  const REST_API_KEY = "7d3a56396c0500b913cedacc843ff47a"; //보통은 이런 고유 상수키값은 어떻게 관리하는지, 따로 lock을 걸어두는지. 이게 .env인지.물어볼것
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_OAUTH_URI = `https:/kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Nav>
      <Logo onClick={() => navigate("/")}>
        <img src="./header.svg" alt="감정일기장" />
      </Logo>
      <NavMenu>
        <a onClick={() => navigate("/")}>
          <span>메인</span>
        </a>
        <a onClick={() => navigate("/diary/write")}>
          <span>일기쓰기</span>
        </a>
        <a onClick={() => navigate("/diary/tutorial")}>
          <span>튜토리얼</span>
        </a>
        <a onClick={() => navigate("/diary/diaryList")}>
          <span>목록</span>
        </a>
        <a onClick={() => navigate("/diary/dali")}>
          <span>달리</span>
        </a>
      </NavMenu>

      <SignOut>
        <UserImg src="./md_favicon.png" alt="" />
        {cookies.userData ? (
          <DropDown>
            <span
              onClick={() => {
                removeCookie("userData", { path: "/" });
                navigate("/");
              }}
            >
              Sign Out
            </span>
          </DropDown>
        ) : (
          <DropDown>
            <a href={KAKAO_OAUTH_URI}>
              <img src={kakaLoginButtonImg} alt="" />
            </a>
            <br></br>

            <br></br>
            <Login>
              <a onClick={() => navigate("/")} alt="">
                Login
              </a>
            </Login>
          </DropDown>
        )}
      </SignOut>
    </Nav>
  );
};

const Nav = styled.nav`
  /* position: fixed; */
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  /* background-color: #dedede; */
  background-color: #090b13;
  /* border-bottom: 2px solid #000; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0%;
  width: 80px;
  margin-left: 4px;
  margin-right: 40px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 180%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  padding-top: 7px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  font-family: "Nanum Gothic", sans-serif;
  a {
    display: flex;
    padding: 0 12px;
    align-items: center;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -5px;
        content: "";
        height: 2px;
        left: 0px;
        right: 0px;
        opacity: 0;
        position: absolute;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  /* &:before {
    content: "hello";
    display: block;
    background-color: rgb(249, 249, 249);
    border-radius: 0px 0px 4px 4px;
    bottom: -6px;
    content: "";
    height: 2px;
    opacity: 0;
    position: absolute;
    right: 0px;
    transform-origin: left center;
    transform: scaleX(0);
    transition: all 250ms cubic-bezier(0.25, 046 0.45, 0.94);
    visibility: hidden;
    width: auto;
  } */

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: black;
  color: white;
  padding: 8px 16px;
  text-transform: uppercase; //uppercase
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2% ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  color: white;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 110px;
  height: 120px;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 45px;
  display: flex;
  cursor: pointer;
  align-items: center; //vertically 얼라인
  justify-content: center; //horizontally 얼라인

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
