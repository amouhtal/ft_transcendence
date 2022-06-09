import { createSlice } from "@reduxjs/toolkit";

export const sizes = createSlice({
  name: "sizes",
  initialState: {
    canvaWidth: 1200,
    canvaHeight: 500,
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
      state.canvaWidth = action.payload;
      state.canvaHeight = action.payload / 2;
      state.rectWidth = action.payload / 80;
      state.rectHeigth = action.payload / 8;
      state.ballSize = action.payload / 80;
      state.ballMovmentX = action.payload / 520;
    },
    update_test: (state) => {
      if (state.zak_test == false) state.zak_test = true;
      else state.zak_test = false;
    },
  },
});

export const { change, update_test } = sizes.actions;
export default sizes.reducer;
