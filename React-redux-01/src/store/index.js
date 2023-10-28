import { configureStore }  from '@reduxjs/toolkit'
import authSlice from './auth';
import counterSlice from './counter';



// const counterReducer = (state = initalState,action) =>{ 기존 리덕스 방식
//   if(action.type === "INCREAMENT"){
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     }
//   }
//   else if(action.type === "DECREAMENT"){
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     }
//   }
//   else if(action.type === "INCREAMENT5"){
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     }
//   }
//   else if(action.type === "TOGGLE"){
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter
//     }
//   }
//   return state;
// }

// const store = createStore(counterReducer);
const store = configureStore({
  // reducer: counterSlice.reducer,
  reducer: {counter: counterSlice, auth: authSlice.reducer } 
  
});

export default store;