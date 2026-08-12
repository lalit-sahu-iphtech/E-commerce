import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder: (state, action) => {
      const order = {
        ...action.payload,
        orderId: Date.now(),
        orderedAt: new Date().toISOString(),
      };

      state.items.push(order);
    },

    clearOrders: (state) => {
      state.items = [];
    },

    removeOrder: (state, action) => {
      state.items = state.items.filter(
        (item) => item.orderId !== action.payload
      );
    },
  },
});

export const {
  addOrder,
  clearOrders,
  removeOrder,
} = orderSlice.actions;

export default orderSlice.reducer;