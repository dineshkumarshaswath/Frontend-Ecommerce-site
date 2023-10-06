import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import productsReducer from "./components/slices/productsSlice"
import productReducer from "./components/slices/productSlice"
import authReducer from './components/slices/authSlice'
import cartReducer from './components/slices/cartSlice'
import orderReducer from './components/slices/orderSlice'


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState:cartReducer,
    orderState:orderReducer
   


})



const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;