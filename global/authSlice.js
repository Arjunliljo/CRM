import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../config/axiosInstance";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/login", credentials);
      console.log(response, "res");

      return response.data.data.user;
    } catch (error) {
      console.log(error, "error");

      return rejectWithValue("Invalid credentials");
    }
  }
);
export const verifyUser = createAsyncThunk(
  "user/verify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/verify");

      return response.data.user;
    } catch (error) {
      return rejectWithValue("Invalid credentials");
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
    autoAssign: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.tabs = [];
      state.defaultTabs = [];
      state.roles = [];
      state.statuses = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
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
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
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
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
