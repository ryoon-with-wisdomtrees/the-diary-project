import { configureStore } from "@reduxjs/toolkit";

import diaryReducer from "./reducer/diarySlice";

//slice -> store

export default configureStore({
  reducer: {
    diary: diaryReducer,
  },
});
