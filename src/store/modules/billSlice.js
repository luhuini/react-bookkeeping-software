import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    loadBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

const { loadBillList } = billSlice.actions;
const billReducer = billSlice.reducer;
// asynchronism
const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    console.log(res);
    dispatch(loadBillList(res.data));
  };
};

export { fetchBillList };
export default billReducer;
