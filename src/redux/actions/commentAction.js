import * as actionTypes from '../constants/commentConstant'
import {api} from '../../utils/api'

export const getComments = () => async dispatch => {
  console.log('   getComments() called...')
  try {
    dispatch({type: actionTypes.GET_COMMENTS_REQUEST})
    const {statusCode, data} = await api.getRequest('/api/comment/')

    if (statusCode === 500) {
      return
    }
    console.log(JSON.parse(data))
    dispatch({
      type: actionTypes.GET_COMMENTS_SUCCESS,
      payload: JSON.parse(data),
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getCommentsById = id => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_COMMENT_ID_REQUEST})

    const {data} = await api.getRequest(`/api/comment/${id}`)
    const p = JSON.parse(data)
    dispatch({
      type: actionTypes.GET_COMMENTS_SUCCESS,
      payload: {
        ...p,
      },
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const postComment = (user_id, proudct_id, comment) => async dispatch => {
  console.log('   postComment() called...')
  try {
    // TO DO: if comment is successfully made, add it to the comment 
    // if fail, do nothing 
    const { statusCode, data } = await api.postRequest('/api/comment/post', { user_id, proudct_id, comment })

    console.log(statusCode)
    console.log(data)

    if (statusCode === 500) 
      return 

    dispatch({
      type: actionTypes.POST_COMMENTS_SUCCESS,
      payload: JSON.parse(data),
    })
  } catch (error) {
    dispatch({
      type: actionTypes.POST_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteComment = (user_id, comment_id) => async dispatch => {
  console.log('   deleteComment() called...')
  try {
    // if successfully delete, remove it from redux 
    // if fail, just return the current or do nothing 
    const { statusCode, data } = await api.deleteRequest('/api/comment/delete', { user_id, comment_id}) 

    console.log(statusCode)
    console.log(data)
    
    if (statusCode === 500)
      return 

    dispatch({
      type: actionTypes.DELETE_COMMENTS_SUCCESS,
      payload: JSON.parse(data),
    })
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
