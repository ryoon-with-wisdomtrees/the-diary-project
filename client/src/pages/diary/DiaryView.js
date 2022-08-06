import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "./../../data/port.json";
import { useCookies } from "react-cookie";

//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";

const DiaryView = () => {
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [currntDiary, setCurrentDiary] = useState({});
  const navigate = useNavigate();
  console.log(params.id);
  useEffect(() => {
    getDiaryView(params.id).then((res) => {
      console.log(res);
      setCurrentDiary(res.data);
    });
  }, []);

  //---------------------------delete-----------------------------------

  const getDiaryView = async () => {
    return await axios.get(url.url + `/diary/${params.id}/view`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };
  const onChangeDiary = (e) => {
    setCurrentDiary({
      ...currntDiary,
      [e.target.name]: e.target.value,
    });
  };

  const deleteDiary = async () => {
    return await axios.get(url.url + `/diary/${params.id}/delete`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onClickDeleteButton = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      //예
      deleteDiary(params.id)
        .then((res) => {
          alert("삭제가 완료됐습니다.");
          navigate("/diary/home");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //아니오.
      return;
    }
  };

  //----------------------------------update------------------------------

  const onClickUpdateButton = () => {
    console.log(params.id);
    dispatch(setDiaryDataDetails(params.id));
    navigate(`/diary/${params.id}/diaryUpdate`);
  };

  //---------------------------------------------------------------------

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
                value={currntDiary.author}
                readOnly
                disabled
              />
              <input
                type="title"
                className="form-control"
                id="user_id"
                name="user_id"
                value={currntDiary.user_id}
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
                value={currntDiary.title}
                onChange={onChangeDiary}
                readOnly
                disabled
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
                value={currntDiary.tag1}
                required
                readOnly
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom04">tag2</label>
              <input
                type="text"
                className="form-control"
                id="tag2"
                name="tag2"
                value={currntDiary.tag2}
                required
                readOnly
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom05">tag3</label>
              <input
                type="text"
                className="form-control"
                id="tag3"
                name="tag3"
                value={currntDiary.tag3}
                required
                readOnly
                disabled
              />
            </div>
          </div>
          <div className="form-group">
            <select
              className="custom-select"
              name="emotion"
              id="emotion"
              value={currntDiary.emotion}
              required
              readOnly
              disabled
            >
              <option value="">{currntDiary.emotion}</option>
              {/* <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option> */}
            </select>
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
              value={currntDiary.content}
              onChange={onChangeDiary}
              readOnly
              disabled
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginRight: "2%" }}
            onClick={onClickUpdateButton}
          >
            수정하기
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
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              onClickDeleteButton(params.id);
            }}
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiaryView;
