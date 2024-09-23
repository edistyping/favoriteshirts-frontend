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
  console.log('\n\n   getProductsByFavorites() called...')
  console.log(favorites);
  console.log("favorite Length: " + Array.isArray(favorites));

  try {
    
    dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})

    if (favorites.length > 0) {
      console.log("Calling favorites!");
      const { statusCode, data } = await api.postRequest('/api/favorite/favorite-products'
        , favorites
      ) 
      
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: data,
      })

    } else {

      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload:
        []
      })

    }
  } catch (error) {

    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        []
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
  