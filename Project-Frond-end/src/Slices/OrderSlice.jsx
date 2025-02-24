import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";

// Fetch Orders
export const fetchOrdersAsync = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.ORDER.GET_USER_ORDERS);
      return response.data.orders;
    } catch (error) {
      // console.log(error , 'jj');
      
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'order/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoint.ORDER.VERIFY_PAYMENT, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Place Order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoint.ORDER.CREATE, orderData);
      console.log(response.data , 'hello')
      return response.data;
    } catch (error) {
      console.log(error , 'hello')
      return rejectWithValue(error.response?.data || error.message)
    }
  }
);

export const fetchRevenue = createAsyncThunk(
  'revenue/fetchRevenue', async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.ADMIN.REVENUE.GET_TOTAL);
      console.log(response.data);
      
      return response?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalRevenue: 0, 
    loading: false,
    error: false,
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
        state.error = false;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = false ;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.totalRevenue = action?.payload?.revanue;
        state.loading = false;
        state.error = false ;
      })
      .addCase(fetchRevenue.pending ,(state ) => {
        state.loading = true ;
        state.error = false ;
      })
      .addCase(fetchRevenue.rejected , (state , action) => {
        state.error = action.payload ;
      state.loading = false ; 
      })
  },
});

export const { clearOrders } = orderSlice.actions;

export default orderSlice.reducer;

