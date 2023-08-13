import { createSlice } from "@reduxjs/toolkit";

const initialState = { content: "", display: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify: (state, action) => {
      state.content = action.payload;
    },
    hideNotification: (state, action) => {
      state.display = false;
    },
    showNotification: (state, action) => {
      state.display = true;
    },
  },
});
export const flashNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(notify(msg));
    dispatch(showNotification());
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
export const { notify, hideNotification, showNotification } =
  notificationSlice.actions;
