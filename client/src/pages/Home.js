import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies("userData");
  useEffect(() => {
    console.log(cookies);
  }, []);

  return (
    <div className="dali__Home">
      작성이 처음이십니까?
      <button onClick={() => navigate("/diary/tutorial")}>
        튜토리얼 보러가기
      </button>
      <button onClick={() => navigate("/diary/write")}>작성하러가기</button>
    </div>
  );
};

export default Home;
