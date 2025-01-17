import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
  },
  reducers: {
    addAuth: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {addAuth} = userSlice.actions;
export const userSelector = (state: any) => state.userReducer.userName;
