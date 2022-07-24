import axios from "axios"
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types"
import { Toast } from "@utils/helper"

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH}`)
    dispatch({
      type: USER_LOADED,
      payload: response.data.data
    })
  } catch (_) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const login = (email, pass, router) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN}`, {
      email: email,
      pass: pass
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
    dispatch(loadUser())
    Toast.fire({
      icon: "success",
      title: "Successful Login"
    })
    router.push("/")
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const registerEngineer = (fullname, nickname, email, password, role, router) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REGISTER}`, {
      fullname: fullname,
      nickname: nickname,
      email: email,
      password: password,
      role: role
    })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    Toast.fire({
      icon: "success",
      title: "Successful Register"
    })
    dispatch(loadUser())
    router.push("/")
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: e.response.data.message
    })
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const registerCompany = (data, router) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REGISTER}`, data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    router.push("/")
    Toast.fire({
      icon: "success",
      title: "Successful Register"
    })
    dispatch(loadUser())
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: e.response.data.message
    })
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}
