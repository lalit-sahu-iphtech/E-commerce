import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cancellationSlice = createSlice({
  name: "cancellations",

  initialState,

  reducers: {
    // ========================================
    // ADD CANCELLED PRODUCT
    // ========================================

    addCancellation: (state, action) => {
      const cancellation = action.payload;

      // Prevent duplicate cancellation
      const alreadyCancelled = state.items.some(
        (item) =>
          item.cancellationId === cancellation.cancellationId
      );

      if (!alreadyCancelled) {
        state.items.push(cancellation);
      }
    },

    // ========================================
    // REMOVE CANCELLATION
    // ========================================

    removeCancellation: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.cancellationId !== action.payload
      );
    },

    // ========================================
    // CLEAR ALL CANCELLATIONS
    // ========================================

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