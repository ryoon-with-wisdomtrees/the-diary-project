// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Redux
import Store from "./app/Store";
import { Provider } from "react-redux";

//components
import Header from "./components/Header";
import Login from "./pages/Login";
import Tutorial from "./pages/diary/Tutorial";
import Home from "./pages/Home";

//social
import KakaoCallBack from "./pages/user/KakaoCallBack";
import SocialSignup from "./pages/user/SocialSignup";

//pages
import DiaryCreate from "./pages/diary/DiaryCreate";
import DiaryView from "./pages/diary/DiaryView";
import DiaryUpdate2 from "./pages/diary/DiaryUpdate2";
import DiaryList from "./pages/diary/DiaryList";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallBack />} />
            <Route path="signUp" element={<SocialSignup />} />
          </Route>
          <Route path="diary">
            {/** 첫로그인후 메인 home */}
            <Route path="home" element={<Home />} />{" "}
            {/** 일기장 작성 튜토리얼 페이지 */}
            <Route path="tutorial" element={<Tutorial />} />
            {/**글작성 */}
            <Route path="write" element={<DiaryCreate />} />
            <Route path="diaryList" element={<DiaryList />} />{" "}
            <Route path=":id">
              <Route path="diaryView" element={<DiaryView />} />{" "}
              {/* url -> http://localhost:3000/review/:id/detail */}
              <Route path="diaryUpdate" element={<DiaryUpdate2 />} />{" "}
              {/* url -> http://localhost:3000/review/:id/update */}
            </Route>
          </Route>

          {/* <Footer /> */}
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;
