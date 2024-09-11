import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    clearNotification() { return "" },
  }
});

export const { changeNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotification = (message, duration = 5000) => (dispatch) => {
  dispatch(changeNotification(message));
  setTimeout(() => {
    dispatch(clearNotification());
  }, duration);
};