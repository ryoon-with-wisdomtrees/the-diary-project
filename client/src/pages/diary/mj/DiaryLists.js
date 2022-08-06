import axios from "axios";
import port from "../../../data/port.json";
import { useState } from "react";
const DiaryLists = () => {
  const [diaries, setDiaries] = useState([]);
  const getDiaries = async () => {
    await axios
      .get(port.url + "/diary/getList")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
      style={{ width: "380px" }}
    >
      <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <svg className="bi pe-none me-2" width="30" height="24">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-5 fw-semibold">일기목록</span>
        <button onClick={getDiaries}>목록확인</button>
      </div>
      <div>
        {
          //getDiaries().then((res)=>{res.data.map((it,index)=>{(<p key={index}>{it.author}</p>)})})
        }
      </div>
    </div>
  );
};

export default DiaryLists;
