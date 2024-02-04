import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter/counterSlice'
import categoryReducer from './counter/categorySlice'
import favoritesReducer from './counter/favoritesSlice'



import productsReducer from './reducers/productReducers'
import { userReducer  } from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
// import productReduecer from './products/productsSlice'
/*
  // https://redux-toolkit.js.org/api/configureStore
  1. reduxjs/toolkit comes with createStore, compose, applyMiddleware, combineReducers from redux. 
  2. All of these are handled internally in the configureStore API provided by @reduxjs/toolkit.
  3. Can remove 'redux' from package.json if @reduxjs/tookit already is imported
  */

const reducer = {
  counter: counterReducer, // use Slice
  products: productsReducer, // use Classic
  category: categoryReducer, // use Slice
  user: userReducer, // use Classic
  favorites: favoritesReducer,
  
  comment: commentReducer,

}


export default configureStore({
  reducer,
})

// Initial State? 
// Why is productReduecer not wokring