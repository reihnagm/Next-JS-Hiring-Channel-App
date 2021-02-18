import { LOADING, LOADED, CHANGE_FILTER_SEARCH_COMPANY, CHANGE_FILTER_SHOW_COMPANY, CHANGE_FILTER_SORT_COMPANY, CHANGE_FILTER_FILTERBY_COMPANY, LOADING_MORE_DATA_COMPANY, LOADED_MORE_DATA_COMPANY, GET_COMPANIES, GET_COMPANIES_ERROR, GET_CURRENT_PROFILE_COMPANY, GET_CURRENT_PROFILE_COMPANY_ERROR, STORE_ADD_JOBS, STORE_ADD_JOBS_ERROR, GET_PROFILE_COMPANY_BY_SLUG, GET_PROFILE_COMPANY_BY_SLUG_ERROR, UPDATE_PROFILE_COMPANY, UPDATE_PROFILE_COMPANY_ERROR, DELETE_COMPANY, DELETE_COMPANY_ERROR } from "../actions/types"
const initialState = {
  companies: [],
  company: {},
  error: {},
  loading: true,
  loadingMoreDataC: true,
  showC: 10,
  filterByC: "latest-update",
  sortC: "newer",
  searchC: ""
}
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_FILTER_SEARCH_COMPANY:
      return {
        ...state,
        searchC: payload
      }
    case CHANGE_FILTER_SHOW_COMPANY:
      return {
        ...state,
        showC: payload
      }
    case CHANGE_FILTER_SORT_COMPANY:
      return {
        ...state,
        sortC: payload
      }
    case CHANGE_FILTER_FILTERBY_COMPANY:
      return {
        ...state,
        filterByC: payload
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
    case LOADING_MORE_DATA_COMPANY:
      return {
        ...state,
        loadingMoreDataC: true
      }
    case LOADED_MORE_DATA_COMPANY:
      return {
        ...state,
        loadingMoreDataC: false
      }
    case GET_COMPANIES:
      return {
        ...state,
        companies: payload
      }
    case GET_COMPANIES_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CURRENT_PROFILE_COMPANY:
      return {
        ...state,
        company: payload
      }
    case GET_CURRENT_PROFILE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_PROFILE_COMPANY_BY_SLUG:
      return {
        ...state,
        company: payload
      }
    case GET_PROFILE_COMPANY_BY_SLUG_ERROR:
      return {
        ...state,
        error: payload
      }
    case UPDATE_PROFILE_COMPANY:
      return state
    case UPDATE_PROFILE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    case STORE_ADD_JOBS:
      return state
    case STORE_ADD_JOBS_ERROR:
      return {
        ...state,
        error: payload
      }
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== payload)
      }
    case DELETE_COMPANY_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
