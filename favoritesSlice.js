// src/redux/favoriteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for async actions
export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (userId) => {
  const response = await fetch(`http://localhost:8000/favorite?userId=${userId}`);
  const data = await response.json();
  return data;
});
export const fetchFavoriteCars = createAsyncThunk(
  'favorites/fetchFavoriteCars',
  async (carIds, { getState }) => {
    const response = await Promise.all(carIds.map(id =>
      fetch(`http://localhost:8000/cars/${id}`).then(res => res.json())
    ));
    return response;
  }
);

export const addFavorite = createAsyncThunk('favorites/addFavorite', async ({ userId, carId }) => {
  const response = await fetch('http://localhost:8000/favorite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, carId })
  });
  const data = await response.json();
  return data;
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ userId, carId }) => {
  const response = await fetch(`http://localhost:8000/favorite?userId=${userId}&carId=${carId}`);
  const data = await response.json();
  var index = 0;
  if (data.length > 0) {
    for(var i = 0; i < data.length; i++){
      if(data[i].carId === carId){
        index = i;
        break;
      }
    }
    await fetch(`http://localhost:8000/favorite/${data[index].id}`, {
      method: 'DELETE',
    });
    return data[index];
  }
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: [],
    favoriteCars: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteCars.fulfilled, (state, action) => {
        state.favoriteCars = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
      });
  }
});

export default favoriteSlice.reducer;
