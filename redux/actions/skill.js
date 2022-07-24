import axios from "axios"
import { LOADING, LOADED, GET_SKILLS, GET_SKILLS_ERROR } from "./types"
export const getSkills = () => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_ALL_SKILLS}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_SKILLS,
      payload: response.data.data
    })
  } catch (e) {
    dispatch({
      type: GET_SKILLS_ERROR,
      payload: e
    })
  }
}
