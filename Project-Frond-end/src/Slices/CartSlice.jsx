import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endpoint } from "../api/endpoints";

// Fetch Cart Async
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint.CART.GET_ALL);
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

      return response.data; // Ensure the response is the full cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding to cart"
      );
    }
  }
);

// Decrement Product in DB and Cart Async
export const decrementProductInDBAndCartAsync = createAsyncThunk(
  "cart/decrementProductInDBAndCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        endpoint.CART.UPDATE_QUANTITY(productId, "decrement")
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error decrementing product quantity."
      );
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
      return response.data.cart;
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
    cart: null, // Ensure `cart` is an object with `products` array
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
        state.cart = action.payload; // Full cart response
        state.loading = false;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart; // Update cart with products
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(decrementProductInDBAndCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.products;
        state.loading = false;
        state.error = null;
      })
      .addCase(decrementProductInDBAndCartAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { calculateTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;
