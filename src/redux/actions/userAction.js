import * as actionTypes from '../constants/userContants'
import {api} from '../../utils/api'

import { setToken, getToken, removeToken, getFavorites } from '../../utils/localstorage'
import { type } from '@testing-library/user-event/dist/type'

// check Token
export const setUserDetails = () => async dispatch => {
  console.log('   setUserDetails()... ')
  const {statusCode, data} = await api.getRequest(`/api/auth/validate`)
  // const {statusCode, data} = await api.postRequest(`/api/auth/refresh-token`)
  
  if (statusCode === 400 || statusCode === 401 || statusCode === 500) {
    console.log(    'setUserDetails failed... setting to initial!');

    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    
    return false 

  } else { 
    console.log(    'setUserDetails success... User initiated!');

    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        isLogin: true,
        details: {...data}
      },
    })
    return true 
  }
}

export const setUserSignIn = (data) => async dispatch => {
  console.log('   setUserSignIn()... ')
  
  console.log(data)
  console.log('   setUserSignIn ending()... ')
  
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


export const setUserDelete = () => async dispatch => {
  console.log('   setUserDelete()... ')
  const {statusCode, data} = await api.deleteRequest(`/api/auth/delete`)

  if (statusCode === 400 || statusCode === 401 || statusCode === 500) {
    console.log(    'There was an error deleting this account')
    alert(    'There was an error deleting this account')
    return
  }

  alert("Account is deleted");
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
  })
  return
}

export const updateUser = (user, updated_user) => async dispatch => {

  // {"userInfo":{"isLogin":true,"details":{"message":"Login successful","username":"bbb","favoritecolor":"zzz"}}}
  // {"username": "bbb", "favoritecolor": "zzz"}

  const updatedUser = {
    ...user, // Spread the original user object
    userInfo: {
      ...user.userInfo, // Spread the userInfo object
      details: {
        ...user.userInfo.details, // Spread the existing details
        ...updated_user // Overwrite with updated_user's keys and values
      }
    }
  };
  
  dispatch({
    type: actionTypes.UPDATE_USER,
    payload: updatedUser
  })

}
