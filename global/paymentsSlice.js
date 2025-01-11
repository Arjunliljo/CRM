import { createSlice } from "@reduxjs/toolkit";

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    autoPaymentsAssign: true,
    curPayment: {},
  },
  reducers: {
    setAutoPaymentsAssign: (state, action) => {
      state.autoPaymentsAssign = action.payload;

      if (!action.payload) {
        state.curPayment = {};
      }
    },
    setCurPayment(state, action) {
      state.curPayment = action.payload;

      if (action.payload) {
        state.autoPaymentsAssign = true;
      }
    },
  },
});

export const { setAutoPaymentsAssign, setCurPayment } = paymentsSlice.actions;

export default paymentsSlice.reducer;
