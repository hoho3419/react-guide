import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers:{
    replaceData(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state,action){
      const newItem = action.payload;
      const existingItem = state.items.find(el => el.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if(!existingItem){
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      }else{
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        // existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItemToCart(state,action){
      const id = action.payload;
      const existingItem = state.items.find(el => el.id === id);
      state.totalQuantity--;
      state.changed = true;
      if(existingItem.quantity === 1){
        state.items = state.items.filter(el => el.id !== id);
      }else{
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    }
  }
});


export const cartActions =  cartSlice.actions;
export default cartSlice.reducer;