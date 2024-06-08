import * as actionTypes from '../constants/userContants'
import {api} from '../../utils/api'

import { setToken, getToken, removeToken, getFavorites } from '../../utils/localstorage'
import { type } from '@testing-library/user-event/dist/type'

export const setUserDetails = () => async dispatch => {
  console.log('   setUserDetails()... ')
  const {statusCode, data} = await api.getRequest(`/api/user/validate`)

  if (statusCode === 400 || statusCode === 401 || statusCode === 500) {
    console.log(    'No user or invalid jwt')
    removeToken();
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    return
  }

  const user = data; 
  console.log(user)
  console.log('   ending()... ')

  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...user}
    },
  })
}

export const setUserSignIn = (data) => async dispatch => {
  const token = data.token; 
  const user = data.user;

  console.log('   setUserSignIn()... ')
  console.log(user)
  console.log('   ending()... ')

  setToken(token);
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...user}
    },
  })
}

export const setInitialState = () => async dispatch => {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
}


