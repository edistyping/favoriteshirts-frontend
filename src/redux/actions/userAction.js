import * as actionTypes from '../constants/userContants'
import {api} from '../../utils/api'

import { setToken, getToken, removeToken, getFavorites } from '../../utils/localstorage'
import { type } from '@testing-library/user-event/dist/type'

export const setUserDetails = () => async dispatch => {
  console.log('   setUserDetails()... ')
  // const {statusCode, data} = await api.getRequest(`/api/auth/verify-token`)
  const {statusCode, data} = await api.postRequest(`/api/auth/refresh-token`)

  if (statusCode === 400 || statusCode === 401 || statusCode === 500) {
    console.log(    'No user or invalid jwt')
    // removeToken();
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    return
  }

  var result = JSON.parse(data);
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...result}
    },
  })
}

export const setUserSignIn = (data) => async dispatch => {
  console.log('   setUserSignIn()... ')
  
  console.log(data)
  console.log('   ending()... ')
  
  // const token = data.token; // No more after using Identity framework 
  // setToken(token);

  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...data}
    },
  })
}

export const setInitialState = () => async dispatch => {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
}


