import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3008/user/${id}`);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async ({ id, orderDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3008/user/${id}`, { order: orderDetails });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Slice to manage orders
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders(state) {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
