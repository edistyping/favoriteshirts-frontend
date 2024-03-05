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
      console.log('   updateFavorite() in redux slice')
      console.log(action.payload)
      
      let currentFavorites = action.payload
      console.log(currentFavorites)
      console.log('-------------------')
      state.value = currentFavorites
    },

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