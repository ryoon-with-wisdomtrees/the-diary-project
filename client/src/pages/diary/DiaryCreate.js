import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";
import url from "../../data/port.json";
import { useNavigate } from "react-router-dom";
import moment from "moment";
//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";

const DiaryCreate = () => {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["userData"]);
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const today = moment("YYYY-MM-DD HH:mm:ss");
  const [diary, setDiary] = useState({});

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies);

      const receivedInfo = {
        shortId: "",
        user_id: cookies.userData.user_id,
        author: cookies.userData.author,
        email: cookies.userData.email,
        title: "",
        content: "",
        emotion: "",
        reg_date: today.format(),
        tag1: "",
        tag2: "",
        tag3: "",
        img_url: "",
      };

      setDiary(receivedInfo);
    }
  }, []);

  const onChangeDiary = (e) => {
    //글셋팅
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  const validationCheck = (diary) => {
    if (diary.title === "") {
      alert("title");
      $("#title").focus();
      return false;
    } else if (diary.content === "") {
      alert("content");
      $("#content").focus();
      return false;
    } else if (diary.emotion === "") {
      alert("emotion");
      $("#emotion").focus();
      return false;
    } else if (diary.tag1 === "") {
      alert("tag1");
      $("#tag1").focus();
      return false;
    } else if (diary.tag2 === "") {
      alert("tag2");
      $("#tag2").focus();
      return false;
    } else if (diary.tag3 === "") {
      alert("tag3");
      $("#tag3").focus();
      return false;
    }
  };

  const onClickCreateDairy = async () => {
    // 글작성
    if (validationCheck) {
      return await axios
        .post(url.url + "/diary/write-page", diary, {
          headers: {
            accessToken: cookies.userData.accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(setDiaryDataDetails(res.data.shortId));
          // setDiary({ ...diary, shortId: res.data.shortId });
          navigate(`/diary/${res.data.shortId}/diaryView`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getDiary = async () => {
    return await axios.get(url.url + `/diary/${diary.shortId}/view`);
  };
  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">작성자</label>
              <input
                type="title"
                className="form-control"
                id="author"
                name="author"
                value={diary.author}
                onChange={onChangeDiary}
                readOnly
                disabled
              />
              <input
                type="title"
                className="form-control"
                id="user_id"
                name="user_id"
                value={diary.user_id}
                onChange={onChangeDiary}
                hidden
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">제목</label>
              <input
                type="title"
                className="form-control"
                id="title"
                name="title"
                placeholder="제목을 입력하세요"
                onChange={onChangeDiary}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">tag1</label>
              <input
                type="text"
                className="form-control"
                id="tag1"
                name="tag1"
                onChange={onChangeDiary}
                placeholder="tag1"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom04">tag2</label>
              <input
                type="text"
                className="form-control"
                id="tag2"
                name="tag2"
                onChange={onChangeDiary}
                placeholder="tag2"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom05">tag3</label>
              <input
                type="text"
                className="form-control"
                id="tag3"
                name="tag3"
                onChange={onChangeDiary}
                placeholder="tag3"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
            </div>
          </div>
          <div className="form-group">
            <select
              className="custom-select"
              name="emotion"
              id="emotion"
              onChange={onChangeDiary}
              required
            >
              <option value="">오늘의 감정지수는?</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <div className="invalid-feedback">감정지수를 선택하세요.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              name="content"
              onChange={onChangeDiary}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginRight: "2%" }}
            onClick={onClickCreateDairy}
          >
            일기작성완료
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              window.history.back();
            }}
          >
            뒤로가기
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiaryCreate;
