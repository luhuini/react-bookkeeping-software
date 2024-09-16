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
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { loadBillList, addBill } = billSlice.actions;
const billReducer = billSlice.reducer;
// asynchronism
const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    console.log(res);
    dispatch(loadBillList(res.data));
  };
};

const modifyBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data);
    console.log(res);
    dispatch(addBill(res.data));
  };
};

export { fetchBillList, modifyBillList };
export default billReducer;
