import axios from "axios"
import LocalStorageService from "./localstorage"

/* --------------------------------
  Request interceptor for API calls
-----------------------------------*/
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const accessToken = await redisClient.get(rediskey)
//     config.headers = {
//       Authorization: `Bearer ${keys.access_token}`,
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//     return config
//   },
//   e => {
//     Promise.reject(e)
//   }
// )

axios.interceptors.request.use(
  config => {
    config.headers['x-auth-token'] = LocalStorageService.getAccessToken
    return config
  },
  e => {
    Promise.reject(e)
  }
)

/*----------------------------------
  Response interceptor for API calls
-----------------------------------*/
axios.interceptors.response.use(
  response => {
    return response
  },
  async function (e) {
    const originalRequest = e.config
    if (e.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // const accessToken = await refreshAccessToken()
      // defaults.headers.common["x-auth-token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNjUsInVpZCI6IjU1ODBkYTJhLTJjMTUtNGM0Ny04ODM0LTQ2NTYyYTI1ZDhhOSIsImZ1bGxuYW1lIjoiUmVpaGFuIEFnYW0ifSwiaWF0IjoxNjMxMzc3MTA4LCJleHAiOjE2MzE5ODE5MDh9.G_2upwo7iuDINgnE3Byj8xcD4qBWEKvNSU60QEs1KhE"
      return axiosApiInstance(originalRequest)
    }
    return Promise.reject(e)
  }
)

export default axios
