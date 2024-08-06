import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import taskReducer from "./tasks/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;
