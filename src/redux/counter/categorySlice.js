import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    value: 'WHITE',
    favorite: []
  },
  reducers: {
    updateCategory: (state, action) => {
      console.log(state)
      console.log(action)
      // state: some weird data
      // action: {type: "category/updateCategory", payload: "payload"}
      state.value = action.payload
    },

    // this one is used for switching to FAVORITE page 
    updateFavorite: (state, action) => {
      state.favorite = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { updateCategory, updateFavorite } = categorySlice.actions

export default categorySlice.reducer