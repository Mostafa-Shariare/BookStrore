import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const authActions = authslice.actions;
export default authslice.reducer;
