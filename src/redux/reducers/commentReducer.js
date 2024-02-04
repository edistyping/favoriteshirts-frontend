import * as actionTypes from "../constants/commentConstant";

export default function commentReducer(state = { comments: [] }, action) {
  switch (action.type) {
    case actionTypes.GET_COMMENTS_REQUEST:
      console.log("   get COMMENTS REUDCER")
      return {
        loading: true,
        comments: [],
      };
    case actionTypes.GET_COMMENTS_SUCCESS:
      console.log("   get COMMENTS GET_COMMENTS_SUCCESS")

      return {
        comments: action.payload,
        loading: false,
      };

    case actionTypes.GET_COMMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
