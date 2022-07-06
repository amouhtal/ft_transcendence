import { createSlice } from "@reduxjs/toolkit";

export const sizes = createSlice({
  name: "sizes",
  initialState: {
    canvaWidth: 1000,
    canvaHeight: 1000/2,
    rectWidth: 10,
    rectHeigth: 50,
    ballSize: 8,
    rectMovment: 6,
    ballMovmentX: 1,
    ballMovmentY: 0,
    zak_test: false,
  },
  reducers: {
    change: (state, action) => {
      state.canvaWidth = action.payload.width;
      state.canvaHeight = action.payload.width / 2;
      state.rectWidth = action.payload.width / 80;
      state.rectHeigth = action.payload.width/ 8;
      state.ballSize = action.payload.width / (1000 / action.payload.ballSize);
      state.ballMovmentX = action.payload.width / 520;
    },
    update_test: (state) => {
      if (state.zak_test == false) state.zak_test = true;
      else state.zak_test = false;
    },
  },
});

export const { change, update_test } = sizes.actions;
export default sizes.reducer;
