import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_ERROR, USER_LOADED } from "../actions/types"
const initialState = {
  isAuthenticated: {},
  user: {},
  loading: true
}
export default function auth(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.access_token)
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {}
      }
    default:
      return state
  }
}
