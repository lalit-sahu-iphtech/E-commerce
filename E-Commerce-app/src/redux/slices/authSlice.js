import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
    user : currentUser || null,
    isAuthenticated : !!currentUser,
}
const authSlice = createSlice({
    name : "auth",
    initialState,

    reducers : {
        login : (state, action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem("currentUser", JSON.stringify(action.payload));
            
        },
        logout : (state) =>{
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("currentUser");
        },
        register : (state, action)=>{
          state.user = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem("currentUser", JSON.stringify(action.payload));

        }
    }
});

export const {login, logout, register} = authSlice.actions;

export default authSlice.reducer;