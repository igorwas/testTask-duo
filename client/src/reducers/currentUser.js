import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  token: '',
  name: '',
  email: ''
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    set: (state, action) => {
      state._id = action.payload._id;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state, action) =>{
      state._id = '';
      state.token = '';
      state.name = '';
      state.email = '';
    },
  },

});

export const { set, remove } = currentUserSlice.actions;

export default currentUserSlice.reducer;