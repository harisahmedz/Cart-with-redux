import { configureStore } from "@reduxjs/toolkit";

import uiSlice from './ui-slice';
import cartSlice from './cart-slice'


const store = configureStore({
    reducer:{
        UI:  uiSlice.reducer,
        cart: cartSlice.reducer,
    }
});


export default store;