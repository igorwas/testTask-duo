import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
};

export const vacanciesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },

});

export const { setList } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;