import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; 
import { toast } from 'react-toastify';
import { endpoint } from '../api/endpoints';

// Add product to wishlist
export const addProductToWishlist = createAsyncThunk(
  'wishlist/addProductToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoint.WISHLIST.ADD(productId));      
      return response.data;  
    } catch (error) {     
      return rejectWithValue(error);
    }
  }
);

// Remove product from wishlist
export const removeProductFromWishlist = createAsyncThunk(
  'wishlist/removeProductFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(endpoint.WISHLIST.REMOVE(productId));
      return response.data.wishlist;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Get the user's wishlist
export const getUserWishlist = createAsyncThunk(
  'wishlist/getUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.WISHLIST.GET_ALL);
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload || [];
        state.error = null;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload === 'Product already exist in the wishlist') {
            state.wishlist = [...state.wishlist];
        }
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default wishlistSlice.reducer;
