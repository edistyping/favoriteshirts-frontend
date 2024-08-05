import * as actionTypes from '../constants/productConstants'
import axios from 'axios'
import {api} from '../../utils/api'


export const getProducts = () => async dispatch => {
  console.log('   getProducts() called...')
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/product')

    console.log(statusCode);
    console.log(data);
    console.log('   ...........................')

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductsByCategory = (category) => async dispatch => {
  console.log('   getProductsByCategory() called...');
  console.log(`   category: ${category}`);

  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/product/' + category)

    if (statusCode !== 200) {
      // error 
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload: [],
      })
      
    } else { 
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: data,
      })
    }

  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductsByUser = () => async dispatch => {
  console.log('   getProductsByUser() called...');
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/product/user-products')

    console.log(statusCode);
    console.log(data);

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductsByFavorites = (favorites) => async dispatch => {
  console.log('   getProductsByFavorites() called...')
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/favorite/favorite-products') // pass in favorite array

    console.log('   getProductsByFavorites() data result: ')
    console.log(statusCode)
    console.log(data)

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const updateProduct = (id, product) => async dispatch => {
  console.log(`   updateProduct =`);
  console.log(`   id: ${id}`);
  console.log(product);

  try {
    console.log('lets goooooo')
    console.log('/api/product/' + id)
    const {statusCode, data} = await api.patchRequest('/api/product/' + id, product)

    console.log(statusCode);
    console.log(data);
    if (statusCode = 204) {
      
    }

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log('wtf')
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async dispatch => {
    console.log(`   deleteProduct`);
    try {
      const {statusCode, data} = await api.deleteRequest('/api/product/' + id)
      console.log(statusCode);
      console.log(data);
  
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}
  