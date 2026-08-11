import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message : "",
    type : "success",
    visible : false,
}
const toastSlice = createSlice({
    name : "toast",
    initialState,

    reducers : {
        showToast : {
            reducer: (state, action) => {
                state.message = action.payload.message;
                state.type = action.payload.type;
                state.visible = true;
            },
            // Supports both showToast({ message, type }) and the older
            // showToast(message, type) calls already used in some components.
            prepare: (toast, type = "success") => ({
                payload: typeof toast === "string"
                    ? { message: toast, type }
                    : {
                        message: toast?.message || "",
                        type: toast?.type || "success",
                    },
            }),
        },
        hideToast : (state)=>{
            state.message = "",
            state.type="",
            state.visible = false;
        }
    }
})
export const{showToast, hideToast} = toastSlice.actions;

export default toastSlice.reducer;
