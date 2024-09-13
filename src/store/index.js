import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/billSlice";
const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});
export default store;
