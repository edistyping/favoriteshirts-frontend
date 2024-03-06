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

    // Just simple update using a provided array
    updateFavorites: (state, action) => {
      let currentFavorites = action.payload
      state.value = currentFavorites
    },

    // Advanced: Just get the selectedFavorite then add/remove after checking 
    updateFavorites2: (state, action) => {
      console.log('   updateFavorites2() in redux slice')
      console.log('selected: ' + action.payload)
      console.log(state.value)

      const selectedFavorite = action.payload

      const inCart= state.value.find((item) => item === selectedFavorite);
      if (inCart) {
        const currentFavorites = state.value 
        const newFavorites = currentFavorites.filter(favorite => favorite !== selectedFavorite)
        state.value = newFavorites;
      } else {
        state.value.push(selectedFavorite);
      }

      // update localStorage here
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setInitialFavorites, updateFavorites, updateFavorites2 } = favoritesSlice.actions

export default favoritesSlice.reducer