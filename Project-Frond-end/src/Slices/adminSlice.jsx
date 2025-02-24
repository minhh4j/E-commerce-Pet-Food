import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { endpoint } from '../api/endpoints';

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${endpoint.ADMIN.USERS.GET_ALL}?page=${page}&limit=${limit}`
      );
      console.log(response.data.Users , 'users in slice')
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const blockAndUnblockUser = createAsyncThunk(
    'auth/blockAndUnblockUser',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(endpoint.ADMIN.USERS.BLOCK_UNBLOCK(id));
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );



const initialState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalUsers:0
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.Users.users || []; 
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
        state.totalUsers = action.payload.Users.totalUser
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      .addCase(blockAndUnblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockAndUnblockUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.error = null;
      })
      .addCase(blockAndUnblockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

// Export reducer and actions
export const { setPage } = userSlice.actions;
export default userSlice.reducer;
