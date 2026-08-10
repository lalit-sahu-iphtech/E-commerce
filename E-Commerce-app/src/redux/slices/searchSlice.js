import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  results: [],
  suggestions: [],
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },

    setSearchResults: (state, action) => {
      state.results = action.payload;
    },

    setSearchSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },

    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.suggestions = [];
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setSearchSuggestions,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;