import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.action";
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;