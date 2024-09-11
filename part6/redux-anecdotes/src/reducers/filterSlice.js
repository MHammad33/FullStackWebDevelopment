import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      const changedFilter = action.payload;
      state = changeFilter;
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
