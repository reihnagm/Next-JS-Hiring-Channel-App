import { LOADING, LOADED, GET_SKILLS, GET_SKILLS_ERROR } from "../actions/types"
const initialState = {
  skills: [],
  error: {},
  loading: true
}
export default function skill(state = initialState, action) {
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
    case GET_SKILLS:
      return {
        ...state,
        skills: payload
      }
    case GET_SKILLS_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
