import * as actionTypes from '../constants/productConstants'
import axios from 'axios'
import {api} from '../../utils/api'


export const getProducts = () => async dispatch => {
  console.log('   getProducts() called...')
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {data} = await api.getRequest('/api/product')
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

export const getProductsByCategory = (category) => async dispatch => {
  console.log('   getProductsByCategory() called...');
  console.log(`   category: ${category}`);

  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/product/' + category)

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

export const getProductsByMe = () => async dispatch => {
  console.log('   getProductsByMe() called...');
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/product/myposts')

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
  console.log('   getProductsByCategory() called...')
  try {
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    const {data} = await api.getRequest('/api/product/favorites/') // pass in favorite array
    console.log(data)

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: JSON.parse(data),
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
  