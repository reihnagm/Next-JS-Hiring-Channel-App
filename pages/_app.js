import React, { useEffect } from "react"
import { PersistGate } from "redux-persist/integration/react"
import { useDispatch } from "react-redux"
import { loadUser } from "@redux/actions/auth"
import { ThemeProvider } from "@material-ui/core/styles"
import { Provider } from "react-redux"
import { createWrapper } from "next-redux-wrapper"
import { store, persistor } from "@redux/store"
import LocalStorageService from "@utils/localstorage"
import Router from "next/router"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../configs/theme"
import axios from "axios"

let localStorageService = LocalStorageService.getService()

axios.interceptors.request.use(
  config => {
    if(localStorageService.getAccessToken()) {
      config.headers['x-auth-token'] = localStorageService.getAccessToken()
    }
    return config
  },
  e => {
    Promise.reject(e)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  async (e) => {
    if(e.response.status === 401) {
      if(localStorageService.getRefreshToken()) {
        return axios.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN, {
          headers: {
            'x-auth-token': localStorageService.getRefreshToken()
          }            
        }).then((res) => {
          localStorage.setItem('access_token', res.data.refresh_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          return axios(e.response.config);
        })
      }
    }
    if(e.response.status === 500 && e.response.data.message == 'jwt expired') {
      localStorage.setItem('access_token', localStorageService.getRefreshToken())
      localStorage.setItem('refresh_token', localStorageService.getRefreshToken())
      return axios(e.response.config);
    }
  }
)


/* Class Component */

// class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <>
//         <Head>
//           <meta charSet="utf-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
//           {/* Favicon */}
//           <link rel="shortcut icon" href="/assets/images/favicon/favicon.ico" />
//           {/* main CSS */}
//           <link rel="stylesheet" href="/assets/css/main.css" />
//           {/* Google Font Nunito */}
//           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" />
//           {/* Google Maps API */}
//           <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFRpXPf8BXaR22nDvvx2ghBfbUbGGX8N8&libraries=places"></script>
//         </Head>
//         <Provider store={store}>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Component {...pageProps}></Component>
//           </ThemeProvider>
//         </Provider>
//       </>
//     )
//   }
// }

/* Functional Component */

Router.onRouteChangeStart = () => {
  document.getElementById("loading").style.display = "block"
  document.getElementsByTagName("body")[0].style.overflow = "hidden"
}
Router.onRouteChangeComplete = () => {
  document.getElementById("loading").style.display = "none"
  document.getElementsByTagName("body")[0].style.overflow = "auto"
}
Router.onRouteChangeError = () => {}

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
              id="loading"
              style={{
                position: "fixed",
                background: "rgba(0, 0, 0, 0.2)",
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 1000,
                display: "none"
              }}
            >
              <div className="flex align-i-center justify-c-center min-h-screen">
                <div className="spinner spinner-loader">
                  <span className="spinner-item-loader-route"></span>
                  <span className="spinner-item-loader-route"></span>
                  <span className="spinner-item-loader-route"></span>
                </div>
              </div>
            </div>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  )
}
const makeStore = () => store
const wrapper = createWrapper(makeStore, { debug: false })
export default wrapper.withRedux(MyApp)
