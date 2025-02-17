import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Slices/ProductSlice"
import CartReducer from "../Slices/CartSlice"
import SearchReducer from "../Slices/SearchSlice"
import OrdersReducer from "../Slices/OrderSlice"
import AuthReducer from '../Slices/AuthSlice'
export const Store = configureStore({
    reducer:{
    products:ProductReducer,
    cart:CartReducer,
    orders: OrdersReducer,
    search:SearchReducer,
    Auth:AuthReducer
    }
})


