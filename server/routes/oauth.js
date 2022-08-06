const { Router } = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");
const router = Router();
const axios = require("axios");
const user = require("../models/schema/user");

router.get("/kakao", async (req, res, next) => {
  console.log(2);
  const REST_API_KEY = "7d3a56396c0500b913cedacc843ff47a"; //보통은 이런 고유 상수키값은 어떻게 관리하는지, 따로 lock을 걸어두는지. 이게 .env인지.물어볼것
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_CODE = req.query.code;

  try {
    await axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        {
          headers: {
            "Content-type": " rapplication/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((getToken) => {
        //5번

        // console.log(getToken);
        getKaKaoUserData(getToken.data.access_token).then((userData) => {
          // console.log(userData);
          // 이메일, 닉네임 회원가입 자동으로 진행
          // 이 이메일정보들을 가지고 회원가입페이지로 넘기기.
          // 아니면 DB에 저장. 그래서 checkEmail통해서, 이메일 존재하면 로그인 처리.

          //user Check 함수
          checkUserData(userData.data, res);
        });
      });
  } catch (error) {
    console.log("++++++++++get Kakao error");
    next(error);
  }
});

const checkUserData = async (userData, res) => {
  const isUserCheck = await User.findOne({
    email: userData.kakao_account.email,
  });
  try {
    if (isUserCheck) {
      // true = login

      jwt.sign(
        {
          email: isUserCheck.email,
          name: isUserCheck.name,
        },
        jwtConfig.secret,
        {
          expiresIn: "1d", //1y,1d,2h,1m,5s
        },
        (err, token) => {
          if (err) {
            res
              .status(401)
              .json({ status: false, message: "로그인을 해주세요." });
          } else {
            res.json({
              login: true,
              status: true,
              accessToken: token,
              email: isUserCheck.email,
              author: isUserCheck.name,
              user_id: isUserCheck.user_id,
            });
          }
        }
      );
    } else {
      // false = Sign in
      userData.login = false; //userData에 login 프로퍼티 생성. false값 설정
      res.json(userData);
    }
  } catch (error) {
    console.log(error);
  }
};

//카카오 유저정보 가져옴
const getKaKaoUserData = async (token) => {
  return await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
};
module.exports = router;
