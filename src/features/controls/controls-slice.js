/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'Все книги',
  path: 'all',
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    clearControls: () => initialState,
  },
});

export const { setSearch, setCategory, setPath, clearControls } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

export const selectSearch = (state) => state.controls.search;
export const selectCategory = (state) => state.controls.category;
export const selectPath = (state) => state.controls.path;
export const selectControls = (state) => state.controls;
