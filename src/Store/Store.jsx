import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './FavoritesSlice'
import watchlaterReducer from './WatchLaterSlice'
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchlater: watchlaterReducer,
  },
})
