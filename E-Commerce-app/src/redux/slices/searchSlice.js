import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name : "search",

    initialState : {
        value : "",
    },
    reducers : {
        setSearch : (state, action) =>{
            state.value = action.payload;
        },
        clearSearch : (state) =>{
            state.value = "";
        }
    }
});

export const{setSearch, clearSearch} = searchSlice.actions;

export default searchSlice.reducer;