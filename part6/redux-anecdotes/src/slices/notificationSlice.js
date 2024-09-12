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

export const showNotification = (message, duration = 5000) => (dispatch) => {
  dispatch(changeNotification(message));
  setTimeout(() => {
    dispatch(clearNotification());
  }, duration);
};

export default notificationSlice.reducer;