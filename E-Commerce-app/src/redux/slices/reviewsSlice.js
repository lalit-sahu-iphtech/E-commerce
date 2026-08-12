import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const reviewsSlice = createSlice({
  name: "reviews",

  initialState,

  reducers: {
    addReview: (state, action) => {
      state.items.push(action.payload);
    },

    removeReview: (state, action) => {
      state.items = state.items.filter(
        (review) => review.id !== action.payload
      );
    },

    clearReviews: (state) => {
      state.items = [];
    },
  },
});

export const {
  addReview,
  removeReview,
  clearReviews,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;