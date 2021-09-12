import LocalStorageService from "@utils/localstorage"
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_ERROR, USER_LOADED } from "../actions/types"
const initialState = {
  isAuthenticated: {},
  user: {},
  loading: true
}
const localStorageService = LocalStorageService.getService()
export default function auth(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorageService.setToken(payload)
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      }
    case AUTH_ERROR:
      localStorageService.clearAccessToken()
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {}
      }  
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorageService.clearAllToken()
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
