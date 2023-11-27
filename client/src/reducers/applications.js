import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },

});

export const { setList } = applicationSlice.actions;

export default applicationSlice.reducer;