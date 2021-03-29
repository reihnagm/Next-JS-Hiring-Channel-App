import { create, defaults } from "axios"
const axiosApiInstance = create()

/* --------------------------------
  Request interceptor for API calls
-----------------------------------*/
axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = await redisClient.get(rediskey)
    config.headers = {
      Authorization: `Bearer ${keys.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

/*----------------------------------
  Response interceptor for API calls
-----------------------------------*/
axiosApiInstance.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const accessToken = await refreshAccessToken()
      defaults.headers.common["Authorization"] = "Bearer " + accessToken
      return axiosApiInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)
