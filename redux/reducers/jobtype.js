import { LOADING, LOADED, GET_JOB_TYPES, GET_JOB_TYPES_ERROR } from "../actions/types"
const initialState = {
  jobtypes: [],
  error: {},
  loading: true
}
export default function jobtype(state = initialState, action) {
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
    case GET_JOB_TYPES:
      return {
        ...state,
        jobtypes: payload
      }
    case GET_JOB_TYPES_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
