import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import favoritesSlice from './favoritesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    favorite: favoritesSlice,
  },
});

export default store;
