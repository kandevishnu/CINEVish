import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: JSON.parse(localStorage.getItem('favorites')) || [],
}
export const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action) => {
      const movie = action.payload;
      const alreadyExists = state.value.find((m) => m.id === movie.id);
      if (!alreadyExists) {
        state.value.push(movie);
      }
    },
    remove: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((movie) => movie.id !== id);
    },
  },
});


// Action creators are generated for each case reducer function
export const { add, remove } = FavoritesSlice.actions

export default FavoritesSlice.reducer