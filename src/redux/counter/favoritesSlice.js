import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FavoriteService from '../../utils/favoriteService';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (isLoggedIn) => {
  return await FavoriteService.getFavorites(isLoggedIn);
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async ({ productId, isLoggedIn }) => {
  return await FavoriteService.addFavorite(productId, isLoggedIn);
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async ({ productId, isLoggedIn }) => {
  return await FavoriteService.removeFavorite(productId, isLoggedIn);
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        console.log(action.payload)
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(id => id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
