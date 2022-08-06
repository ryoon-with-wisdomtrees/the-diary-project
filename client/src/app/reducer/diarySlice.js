import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
  shortId: "",
};
const diarySlice = createSlice({
  name: "diaryData",
  initialState,
  reducers: {
    setDiaryDataDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDiaryDataDetails } = diarySlice.actions;
export const selectShortId = (state) => state.diary.shortId;
export default diarySlice.reducer;
