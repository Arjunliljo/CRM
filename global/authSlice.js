// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import apiClient from "../config/axiosInstance";
// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post('/auth/login', credentials);
//       console.log(response);
      
      
//       // Set token in cookie
//     //   Cookies.set('token', response.data.token, { expires: 7 });
      
//       // Set default authorization header for future requests
//     //   apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'An error occurred during login'
//       );
//     }
//   }
// );

// // Example: Add refresh token functionality
// export const refreshToken = createAsyncThunk(
//     'auth/refresh',
//     async (_, { rejectWithValue }) => {
//       try {
//         const response = await apiClient.post('/auth/refresh');
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data?.message);
//       }
//     }
//   );

// // Add interceptor to handle token
// // apiClient.interceptors.request.use(
// //   (config) => {
// //     const token = Cookies.get('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     // token: Cookies.get('token') || null,
//     // isAuthenticated: !!Cookies.get('token'),
//     loading: false,
//     error: null,
//     userDetails: {
//       email: '',
//       name: '',
//       role: '',
//       permissions: [], // Added for role-based access control
//     }
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.userDetails = {
//         email: '',
//         name: '',
//         role: '',
//         permissions: [],
//       };
//       // Clear token from cookie and axios headers
//     //   Cookies.remove('token');
//     //   delete apiClient.defaults.headers.common['Authorization'];
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     // Add a reducer to update user details if needed
//     updateUserDetails: (state, action) => {
//       state.userDetails = {
//         ...state.userDetails,
//         ...action.payload
//       };
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//         state.userDetails = {
//           email: action.payload.email,
//           name: action.payload.name,
//           role: action.payload.role,
//           permissions: action.payload.permissions || [],
//         };
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Selectors
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectCurrentUser = (state) => state.auth.userDetails;
// export const selectAuthError = (state) => state.auth.error;
// export const selectAuthLoading = (state) => state.auth.loading;

// export const { logout, clearError, updateUserDetails } = authSlice.actions;
// export default authSlice.reducer;



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
    tabs:[]
  },
  reducers: {
    logout: (state) => {
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