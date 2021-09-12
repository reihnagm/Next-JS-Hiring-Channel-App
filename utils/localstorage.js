const LocalStorageService = (function () {
  let service
  function getService() {
    if (!service) {
      service = this
      return service
    }
    return service
  }
  function setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.access_token)
    localStorage.setItem("refresh_token", tokenObj.refresh_token)
  }
  function getAccessToken() {
    return typeof window !== "undefined" && window.localStorage.access_token
  }
  function getRefreshToken() {
    return typeof window !== "undefined" && window.localStorage.refresh_token
  }
  function clearAccessToken() {
    localStorage.removeItem("access_token")
  }
  function clearAllToken() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
  return {
    getService: getService,
    setToken: setToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken,
    clearAccessToken: clearAccessToken,
    clearAllToken: clearAllToken
  }
})()
export default LocalStorageService
