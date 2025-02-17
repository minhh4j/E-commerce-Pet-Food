import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import {endpoint} from '../api/endpoints'

const initialState = {
  products: [],
    product: null,
    totalProducts: 0,
    currentPage: 1,
    totalPages: 0,
    loading: true,
    error: null,
    category: null,
    page: 0,
    hasMore: true
};

 export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 10, name,  }, { rejectWithValue }) => {
    try {
      const params = { page, limit, name,  };
      const response = await axiosInstance.get(endpoint.PRODUCT.GET_PRODUCTS, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
  
        const { product, totalProducts, currentPage, total, page } = action.payload;
        state.products = product;
        state.totalProducts = totalProducts;
        state.currentPage = currentPage;
        state.totalPages = Math.ceil(total / 10);
        state.page = page;
        state.loading = false;
        state.hasMore = page < state.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;

