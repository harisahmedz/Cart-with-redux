import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed:false,
  },
  reducers: {
    replaceCart(state, action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      
    },
    addItemsToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      state.changed=true;
      const existingItem = state.items.find((item)=>item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      else{
        state.changed=true;
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItemsToCart(state, action) {
        state.totalQuantity--;
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        if(existingItem.quantity ===1){
            state.items = state.items.filter(item=> item.id !== id); 
        }
        else{
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price
        }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice; 