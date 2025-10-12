import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/CartSlice";
export const Store =configureStore({
    
    reducer:{
cart:CartReducer,


    },


})