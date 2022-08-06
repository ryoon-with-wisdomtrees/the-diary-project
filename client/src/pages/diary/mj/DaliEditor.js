import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import port from "../../../data/port.json";
//import shortId from './../data/short-id'
import { nanoid } from "nanoid";
const DaliEditor = () => {
  const navigate = useNavigate();
  const nameInput = useRef();
  const contentInput = useRef();

  const [writePage, setWritePage] = useState(true); //작성 페이지/ 수정 페이지

  const [state, setState] = useState({
    //입력값 상태 정리
    shortId: nanoid(),
    name: "",
    content: "",
    emotion: 1,
    title: "",
  });

  const [hashtag, setHashTag] = useState({
    //해시태그 입력값 상태정리
    hashtag1: "",
    hashtag2: "",
    hashtag3: "",
  });
  const handleDelete = async () => {
    console.log(state);
    deleteDiary()
      .then((res) => {
        alert(res.data.result);
      })
      .catch((e) => console.log(e));

    // nameInput.current.value="";
    // contentInput.current.value="";
    setState({
      ...state,
      name: "",
      content: "",
      emotion: 1,
      title: "",
    });

    return;
  };

  const handleHashTagState = (e) => {
    setHashTag({
      ...hashtag,
      [e.target.name]: e.target.value,
    });
  };
  const handleHashTagSubmit = async (e) => {
    alert("사진 생성중입니다. 생성 이전에 태그 변경시 작동하지 않습니다");
    //await 사진 생성 달리 api?
  };

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    //console.log(state)
  };

  const handleSubmit = () => {
    // if(state.name.length < 1) {
    //   alert("작성자는 최소 1글자 이상 입력해주세요.");

    //   nameInput.current.focus();
    //   // navigate('/mainpage/DiaryUpdate');
    //   return;
    // }

    // if(state.content.length < 5){
    //   alert("일기 본문은 최소 5글자 이상 입력해주세요.");

    //   contentInput.current.focus();
    //   return;
    // }
    if (writePage) {
      sendDiary()
        .then((res) => {
          alert(res.data.result);
        })
        .catch((e) => {
          console.log(e);
        });
      setWritePage(false);
    } else {
      try {
        updateDiary()
          .then((res) => {
            //console.log(res)}
            alert(res.data.result);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
      //수정 작성
      //작성 버튼 누르면 수정 페이지로 바뀌니까 버튼 하나더 생성
    }
  };

  // const handleGetOneDiary =() =>{
  //   getOneDiary()
  //   .then((res)=>{console.log(res)})
  //   .catch((e)=>{console.log(e)})
  // }

  const getOneDiary = async () => {
    await axios
      .get(port.url + `/diary/${state.shortId}/getOne`)
      .then((res) => {
        // let monthDate;
        // monthDate = res.data.createdAt.slice(5,10);
        // let month = monthDate.slice(0,2);
        // let date = monthDate.slice(3,5)
        // console.log(`${month}월 ${date}일`)})
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendDiary = async () => {
    return await axios.post(port.url + "/diary/insert", state);
  };
  const deleteDiary = async () => {
    return await axios.get(port.url + `/diary/${state.shortId}/delete`);
  };
  const updateDiary = async () => {
    return await axios.post(port.url + `/diary/${state.shortId}/update`, state);
  };

  return (
    <div className="DaliEditor">
      <h2>오늘의 일기</h2>

      <div>
        <input
          ref={nameInput}
          name="name"
          value={state.name}
          onChange={handleChangeState}
          placeholder="작성자"
        />
      </div>

      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
          placeholder="내용"
        />
      </div>
      <div>
        <textarea
          name="title"
          value={state.title}
          onChange={handleChangeState}
          placeholder="제목"
        />
      </div>

      <div>
        오늘의 감정상태는?
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <div className="hashtag">
          오늘의 #해시태그를 입력하세요.<br></br>
          <input
            type="text"
            name="hashtag1"
            value={hashtag.hashtag1}
            onChange={handleHashTagState}
            placeholder="#소확행"
          ></input>
          <input
            type="text"
            name="hashtag2"
            value={hashtag.hashtag2}
            onChange={handleHashTagState}
            placeholder="#바다"
          ></input>
          <input
            type="text"
            name="hashtag3"
            value={hashtag.hashtag3}
            onChange={handleHashTagState}
            placeholder="#강아지"
          ></input>
        </div>
        <button onClick={handleHashTagSubmit}>사진저장</button>
        <button onClick={getOneDiary}>하나가져오기</button>
      </div>
      <button onClick={handleSubmit}>저장하기</button>
      {writePage ? <></> : <button onClick={handleDelete}>삭제하기</button>}
    </div>
  );
};

export default DaliEditor;
