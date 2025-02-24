import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for fetching user details

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.AUTH.ME);
      return response.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Please login with your credentials");
      }
      return rejectWithValue(error.response?.data || "Failed to fetch user details");
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(endpoint.AUTH.LOGOUT);
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.adminAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
