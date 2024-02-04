import { createSlice, current } from '@reduxjs/toolkit'

import { getDefaultFavorites } from '../../utils/localstorage'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    value: [],
  },
  reducers: {
    setInitialFavorites: (state) => {
      console.log('   setInitialFavorites() in redux')
      var data = getDefaultFavorites()
      if (Array.isArray(data)) {
        state.value = data
      } else {
        state.value = []
      }
    },

    updateFavorites: (state, action) => {
      // const { payload } = param;
      // state.location = [...state.location, payload];
      console.log('   updateFavorite() in redux')
      let currentFavorites = action.payload
      console.log(currentFavorites)
      console.log('-------------------')
      state.value = currentFavorites
  },
  },
})

// Action creators are generated for each case reducer function
export const { setInitialFavorites, updateFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer