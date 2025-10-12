import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,  // ✅ put it INSIDE the reducer object
  },
});

export default store;
