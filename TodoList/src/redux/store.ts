import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/Reducer";

const store = configureStore({
    reducer: {
      auth: userReducer,
    },
  });
  
  export default store;