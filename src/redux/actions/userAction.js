import * as actionTypes from '../constants/userContants'
import {api} from '../../utils/api'

import { getToken, getFavorites } from '../../utils/localstorage'

export const setUserDetails = () => async dispatch => {
  console.log('   setUserDetails()... ')
  const {statusCode, data} = await api.getRequest(`/api/user/me`)

  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    return
  }
  const {user} = JSON.parse(data)
  console.log(user)
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


