import axios from "axios"
import { LOADING, LOADED, GET_JOB_TYPES, GET_JOB_TYPES_ERROR } from "./types"
export const getJobTypes = () => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_JOB_TYPES}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_JOB_TYPES,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_JOB_TYPES_ERROR,
      payload: err
    })
  }
}
