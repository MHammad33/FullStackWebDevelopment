import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    clearNotification() => "",
  }
});

export const { changeNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
