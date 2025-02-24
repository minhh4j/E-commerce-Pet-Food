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
    hasMore: true,
    totalCatProducts : 0 , 
    totalDogCategory : 0
};

 export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 10, name,  }, { rejectWithValue }) => {
    try {
      const params = { page, limit, name,  };
      const response = await axiosInstance.get(endpoint.PRODUCT.GET_PRODUCTS, { params });
      console.log(response.data , 'product');
      
      return response.data;
    } catch (error) {
      console(error);
      return rejectWithValue(error);
    }
  }
);
    
  export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (productData, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("oldPrice", productData.oldPrice);
        if (productData.image) {
          formData.append("image", productData.image); 
        }
        formData.append("category", productData.category);
        formData.append("seller", productData.seller);
        formData.append("stock", productData.stock);
        formData.append("description", productData.description);
        formData.append("ingredients", JSON.stringify(productData.ingredients))
        const response = await axiosInstance.post(endpoint.ADMIN.PRODUCTS.ADD, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add product");
      }
    }
  );
  export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(endpoint.ADMIN.PRODUCTS.DELETE(productId));
        console.log(response);
        
        return productId ; 

      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("oldPrice", data.oldPrice);
        if (data.image) {
          formData.append("image", data.image); 
        }
        formData.append("category", data.category);
        formData.append("seller", data.seller);
        formData.append("stock", data.stock);
        formData.append("description", data.description);
        formData.append("ingredients", JSON.stringify(data.ingredients));
  
        const response = await axiosInstance.patch(endpoint.ADMIN.PRODUCTS.EDIT(id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update product");
      }
    }
  );

  export const getTopSellingProducts = createAsyncThunk(
    'products/getTopSellingProducts', async(__dirname,{ rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(endpoint.ADMIN.STATISTICS.GET_TOP_SELLING_PRODUCTS);
        return response.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )

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
  
        const { product, total, currentPage, page , totalCatCategory , totalDogCategory } = action.payload;
        state.products = product;
        state.totalProducts = total;
        state.currentPage = currentPage;
        state.totalPages = Math.ceil(total / 10);
        state.page = page;
        state.totalCatProducts = totalCatCategory
        state.totalDogCategory  = totalDogCategory
        state.loading = false;
        state.hasMore = page < state.totalPages;
      })


      
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTopSellingProducts.fulfilled, (state, action) => {
        state.topSellingProducts = action.payload.data        
      })
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;

