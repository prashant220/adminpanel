import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    isTest: true,
  },
  reducers: {
    setTest: (state, action) => {
      return { ...state, isTest: action.payload };
    },
  },
});

export const { setTest } = testSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default testSlice.reducer;
