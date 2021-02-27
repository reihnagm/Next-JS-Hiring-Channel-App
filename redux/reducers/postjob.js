import { LOADING, LOADED, EDIT_POST_JOB, EDIT_POST_JOB_ERROR, UPDATE_POST_JOB, UPDATE_POST_JOB_ERROR } from "../actions/types"
const initialState = {
  postjob: {},
  error: {},
  loading: true
}
export default function postjob(state = initialState, action)  {
  const { type, payload } = action
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADED:
      return {
        ...state,
        loading: false
      }
    case EDIT_POST_JOB:
      return {
        ...state,
        postjob: payload
      }
    case EDIT_POST_JOB_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_POST_JOB:
      return state
    case UPDATE_POST_JOB_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
