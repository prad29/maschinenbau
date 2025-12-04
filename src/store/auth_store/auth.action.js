import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk('auth/login',
    async ({ email, password, handleSuccess }, thunkAPI) => {
        try {
            let userData = { email, password, name: "Demo User" };
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve(userData)
                    });
                }, 2000);
            });
            const data = await response.json();
            // SUCCESS PATH
            if (response.ok) {
                handleSuccess()
                return data;     // <--- return success result
            }
            // FAILURE PATH
            return thunkAPI.rejectWithValue(data.message || "Login failed");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export { login };
