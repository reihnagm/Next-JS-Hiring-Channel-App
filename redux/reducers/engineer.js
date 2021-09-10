import { LOADING, LOADED, CHANGE_FILTER_SEARCH, CHANGE_FILTER_SHOW, CHANGE_FILTER_SORT, CHANGE_FILTER_FILTERBY, LOADING_MORE_DATA, LOADED_MORE_DATA, GET_ENGINEERS, GET_ENGINEERS_ERROR, GET_MORE_DATA, GET_MORE_DATA_ERROR, GET_CURRENT_PROFILE_ENGINEER, GET_CURRENT_PROFILE_ENGINEER_ERROR, GET_PROFILE_ENGINEER_BY_SLUG, GET_PROFILE_ENGINEER_BY_SLUG_ERROR, UPDATE_PROFILE_ENGINEER, UPDATE_PROFILE_ENGINEER_ERROR, DELETE_ENGINEER, DELETE_ENGINEER_ERROR } from "../actions/types"
const initialState = {
  engineers: [],
  engineersCount: 0,
  engineer: {},
  error: {},
  loading: false,
  loadingMoreData: true,
  showN: 10,
  filterByN: "latest-update",
  sortN: "newer",
  searchN: ""
}
export default function engineer(state = initialState, action) {
  const { type, payload } = action
  const { engineers } = state
  switch (type) {
    case CHANGE_FILTER_SEARCH:
      return {
        ...state,
        searchN: payload
      }
    case CHANGE_FILTER_SHOW:
      return {
        ...state,
        showN: payload
      }
    case CHANGE_FILTER_SORT:
      return {
        ...state,
        sortN: payload
      }
    case CHANGE_FILTER_FILTERBY:
      return {
        ...state,
        filterByN: payload
      }
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
    case LOADING_MORE_DATA:
      return {
        ...state,
        loadingMoreData: true
      }
    case LOADED_MORE_DATA:
      return {
        ...state,
        loadingMoreData: false
      }
    case GET_ENGINEERS:
      return {
        ...state,
        engineers: payload,
        engineersCount: payload.length
      }
    case GET_ENGINEERS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_MORE_DATA:
      return {
        ...state,
        engineers: [...engineers, ...payload],
        engineersCount: payload.length
      }
    case GET_MORE_DATA_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER:
      return {
        ...state,
        engineer: payload
      }
    case GET_CURRENT_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG:
      return {
        ...state,
        engineer: payload
      }
    case GET_PROFILE_ENGINEER_BY_SLUG_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_PROFILE_ENGINEER:
      return state
    case UPDATE_PROFILE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    case DELETE_ENGINEER:
      return {
        ...state,
        engineers: state.engineers.filter(engineer => engineer.id !== payload)
      }
    case DELETE_ENGINEER_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
