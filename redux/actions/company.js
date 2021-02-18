import axios from "axios"
import { Toast, auth } from "../../utils/helper"
import { LOADING, LOADED, LOADING_MORE_DATA, LOADED_MORE_DATA, EDIT_POST_JOB, EDIT_POST_JOB_ERROR, UPDATE_POST_JOB, UPDATE_POST_JOB_ERROR, STORE_ADD_JOBS, STORE_ADD_JOBS_ERROR, GET_COMPANIES, GET_COMPANIES_ERROR, GET_MORE_DATA, GET_MORE_DATA_ERROR, GET_CURRENT_PROFILE_COMPANY, GET_CURRENT_PROFILE_COMPANY_ERROR, GET_PROFILE_COMPANY_BY_SLUG, GET_PROFILE_COMPANY_BY_SLUG_ERROR, UPDATE_PROFILE_COMPANY, UPDATE_PROFILE_COMPANY_ERROR, DELETE_COMPANY, DELETE_COMPANY_ERROR } from "./types"
export const getCompanies = (searchC, showC, sortC, filterByC) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_COMPANIES}?search=${searchC}&show=${showC}&sort=${sortC}&filterby=${filterByC}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_COMPANIES,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_COMPANIES_ERROR,
      payload: err
    })
  }
}
export const getCompaniesMoreData = (searchN, showN, sortN, filterByN, offset) => async dispatch => {
  try {
    dispatch({
      type: LOADING_MORE_DATA
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_COMPANIES}?search=${searchN}&show=${showN}&sort=${sortN}&filterby=${filterByN}&offset=${offset}`)
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
export const getCurrentProfileCompany = () => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.post(`${process.env.NEXT_PUBLIC_GET_COMPANIES}/profile`, { userUid: auth().uid })
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY_ERROR,
      payload: error
    })
  }
}
export const getProfileCompanyBySlug = slug => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_COMPANIES}/profile/${slug}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG_ERROR,
      payload: error
    })
  }
}
export const storeAddJob = (payload, router) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.post(`${process.env.NEXT_PUBLIC_STORE_POST_JOB}`, {
      title: payload.title,
      content: payload.content,
      salary: payload.salary,
      skills: { skills: payload.skills },
      jobtypes: payload.jobtypes,
      companyUid: payload.companyUid
    })
    dispatch({
      type: LOADED
    })
    router.push("/companies")
    Toast.fire({
      icon: "success",
      title: "Post Job Created"
    })
    dispatch({
      type: STORE_ADD_JOBS
    })
  } catch (err) {
    dispatch({
      type: STORE_ADD_JOBS_ERROR,
      payload: err.message
    })
  }
}
export const updateProfileCompany = (payload, router) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.put(`${process.env.NEXT_PUBLIC_GET_COMPANIES}`, payload)
    Toast.fire({
      icon: "success",
      title: "Profile Updated"
    })
    router.push("/companies")
    dispatch({
      type: LOADED
    })
    dispatch({
      type: UPDATE_PROFILE_COMPANY,
      payload: payload
    })
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_COMPANY_ERROR,
      payload: err
    })
  }
}
export const deleteProfileCompany = id => async dispatch => {
  const company_id = id
  try {
    await axios.delete(`http://localhost:5000/api/v1/companies/${company_id}`)
    dispatch({
      type: DELETE_COMPANY,
      payload: company_id
    })
  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_ERROR,
      payload: error
    })
  }
}

export const editPostJob = slug => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.post(process.env.NEXT_PUBLIC_EDIT_POST_JOB, {
      slug: slug
    })
    dispatch({
      type: LOADED
    })
    dispatch({
      type: EDIT_POST_JOB,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: EDIT_POST_JOB_ERROR,
      payload: err
    })
  }
}

export const updatePostJob = (payload, router) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.put(process.env.NEXT_PUBLIC_UPDATE_POST_JOB, {
      payload: payload
    })
    router.push("/companies")
    dispatch({
      type: LOADED
    })
    dispatch({
      type: UPDATE_POST_JOB
    })
  } catch (err) {
    dispatch({
      type: UPDATE_POST_JOB_ERROR,
      payload: err
    })
  }
}
