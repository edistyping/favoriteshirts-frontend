import * as actionTypes from '../constants/userContants'
import {api} from '../../utils/api'

import { getToken, getFavorites } from '../../utils/localstorage'
import { type } from '@testing-library/user-event/dist/type'

export const setUserDetails = () => async dispatch => {
  console.log('   setUserDetails()... ')
  const {statusCode, data} = await api.getRequest(`/api/user/validate`)

  console.log(statusCode)
  console.log(data)

  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    return
  }
  
  const {user} = JSON.parse(data)
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


