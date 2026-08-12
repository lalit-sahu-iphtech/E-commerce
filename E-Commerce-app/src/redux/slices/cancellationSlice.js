import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cancellationSlice = createSlice({
  name: "cancellations",

  initialState,

  reducers: {
    addCancellation: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.id === product.id
      );

      if (!alreadyExists) {
        state.items.push({
          ...product,
          cancellationStatus: "Cancelled",
          cancelledAt: new Date().toLocaleDateString(),
        });
      }
    },

    removeCancellation: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCancellations: (state) => {
      state.items = [];
    },
  },
});

export const {
  addCancellation,
  removeCancellation,
  clearCancellations,
} = cancellationSlice.actions;

export default cancellationSlice.reducer;