import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../config/axiosInstance";
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        console.log(credentials);

        try {
            const response = await apiClient.post('/user/login', credentials);
            Cookies.set('token', response.data.data.user.token, { expires: 7 });
            return response.data
        } catch (error) {
            return rejectWithValue('Invalid credentials');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        tabs: [],
        defaultTabs: [],
        rols: [],
        statuses: [],
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("token");
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);

                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const selectAuth = (state) => state.auth;

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;