import axios from "axios"
import store from "../store.js"
import { Toast, auth } from "../../utils/helper"
import { logout } from "./auth"
import { LOADING, LOADED, LOADING_MORE_DATA, LOADED_MORE_DATA, GET_ENGINEERS, GET_ENGINEERS_ERROR, GET_MORE_DATA, GET_MORE_DATA_ERROR, GET_CURRENT_PROFILE_ENGINEER, GET_CURRENT_PROFILE_ENGINEER_ERROR, GET_PROFILE_ENGINEER_BY_SLUG, GET_PROFILE_ENGINEER_BY_SLUG_ERROR, UPDATE_PROFILE_ENGINEER, UPDATE_PROFILE_ENGINEER_ERROR } from "./types"

export const getEngineers = (searchN, showN, sortN, filterByN) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_ENGINEERS}?search=${searchN}&show=${showN}&sort=${sortN}&filterby=${filterByN}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_ENGINEERS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_ENGINEERS_ERROR,
      payload: err
    })
  }
}
export const getEngineersMoreData = (searchN, showN, sortN, filterByN, offset) => async dispatch => {
  try {
    dispatch({
      type: LOADING_MORE_DATA
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_ENGINEERS}?search=${searchN}&show=${showN}&sort=${sortN}&filterby=${filterByN}&offset=${offset}`)
    dispatch({
      type: LOADED_MORE_DATA
    })
    dispatch({
      type: GET_MORE_DATA,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_MORE_DATA_ERROR,
      payload: err
    })
  }
}
export const getCurrentProfileEngineer = () => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.post(`${process.env.NEXT_PUBLIC_GET_ENGINEERS}/profile`, { userUid: auth().uid })
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_CURRENT_PROFILE_ENGINEER,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_CURRENT_PROFILE_ENGINEER_ERROR,
      payload: err
    })
  }
}
export const getProfileEngineerBySlug = slug => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_ENGINEERS}/profile/${slug}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_PROFILE_ENGINEER_BY_SLUG,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_PROFILE_ENGINEER_BY_SLUG_ERROR,
      payload: err
    })
  }
}
export const updateProfileEngineer = (payload, router) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.put(`${process.env.NEXT_PUBLIC_GET_ENGINEERS}`, payload)
    dispatch({
      type: LOADED
    })
    router.push("/engineers")
    Toast.fire({
      icon: "success",
      title: "Profile Updated"
    })
    dispatch({
      type: UPDATE_PROFILE_ENGINEER
    })
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ENGINEER_ERROR,
      payload: err
    })
  }
}
// export const deleteProfileEngineer = (engineer_id, user_id) => async dispatch => {
//   store.dispatch(logout())
//   try {
//     await axios.delete(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/${engineer_id}/${user_id}`)
//     dispatch({
//       type: DELETE_ENGINEER,
//       payload: engineer_id
//     })
//   } catch (error) {
//     dispatch({
//       type: DELETE_ENGINEER_ERROR,
//       payload: error
//     })
//   }
// }
