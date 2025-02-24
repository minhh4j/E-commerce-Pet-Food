import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";

// Fetch Cart Async
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.CART.GET_ALL);
      console.log(response);
      

      return response.data.cart;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Add Product to Cart and DB Async
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoint.CART.ADD_TO_CART(id));
      console.log(response);

      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding to cart"
      );
    }
  }
);


export const updateQuantity = createAsyncThunk(
  "cart/decrementProductInDBAndCart",
  async ({ productId, action }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        endpoint.CART.UPDATE_QUANTITY(productId, action)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error)
      
    }
  }
);

// Remove Product from Cart Async
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        endpoint.CART.REMOVE_PRODUCT(productId)
      );
      console.log(response, "oo");

      return { cart: response.data.cart, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error removing product from cart."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    calculateTotalAmount(state) {
      state.totalAmount = state.cart.products.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error=false;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
    })
    .addCase(updateQuantity.fulfilled, (state) => {
        state.loading = false;    
        state.error = null;
        
    })
    .addCase(updateQuantity.rejected, (state, ) => {
        state.loading = false;
        // state.error = action.payload;
        
    })
  },
});

export const { calculateTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;
