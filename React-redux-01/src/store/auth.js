import { createSlice } from '@reduxjs/toolkit';



const authInitalState = { isAuthentication: false, }

const authSlice = createSlice({
  name: 'authentication',
  initialState: authInitalState,
  reducers:{
    login(state){
      state.isAuthentication = true;
    },
    logout(state){
      state.isAuthentication = false;
    }
  }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;