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
            console.log(response.data.data.user);

            return response.data.data.user
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
        roles: [],
        statuses: [],
        autoAssign: false
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("token");
            state.user = null;
            state.isAuthenticated = false;
            state.tabs = null
            state.defaultTabs = null
            state.roles = null
            state.statuses = null
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
                console.log("payload", action.payload);

                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.tabs = action.payload.tabs || [];
                state.defaultTabs = action.payload.defaultTabs || [];
                state.roles = action.payload.roles || [];
                state.statuses = action.payload.statuses || [];
                state.autoAssign = action.payload.autoAssign || false;
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