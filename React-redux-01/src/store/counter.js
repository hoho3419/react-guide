import { createSlice } from '@reduxjs/toolkit'

const counterInitalState = {counter: 0, showCounter : true};

const counterSlice = createSlice({
  name: 'counter',
  initialState: counterInitalState,
  reducers:{
    Increament(state){
      state.counter++
    },
    Increament5(state,action){
      state.counter = state.counter + action.payload;
    },
    Decreament(state){
      state.counter--;
    },
    toggle(state){
      state.showCounter = !state.showCounter;
    }
  }
})
export const counterAction = counterSlice.actions;
export default counterSlice.reducer;