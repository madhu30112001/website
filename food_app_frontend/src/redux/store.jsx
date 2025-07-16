import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slice/globalSlice";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
export default store;
