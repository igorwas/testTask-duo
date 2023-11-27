import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  message: ''
};


export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    remove: (state, action) =>{
      state.type = '';
      state.message = '';
    },
  },

});

export const { set, remove } = notificationSlice.actions;

export default notificationSlice.reducer;