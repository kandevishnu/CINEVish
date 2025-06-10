import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}
export const WatchLaterSlice = createSlice({
  name: 'WatchLater',
  initialState,
  reducers: {
    addWatchLater: (state, action) => {
      const movie = action.payload;
      const alreadyExists = state.value.find((m) => m.id === movie.id);
      if (!alreadyExists) {
        state.value.push(movie);
      }
    },
    removeWatchLater: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((movie) => movie.id !== id);
    },
  },
});


// Action creators are generated for each case reducer function
export const { addWatchLater, removeWatchLater } = WatchLaterSlice.actions

export default WatchLaterSlice.reducer