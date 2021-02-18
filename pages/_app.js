import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "../redux/actions/auth"
import { ThemeProvider } from "@material-ui/core/styles"
import { Provider } from "react-redux"
import { createWrapper } from "next-redux-wrapper"
import Head from "next/head"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../configs/theme"
import setAuthToken from "../utils/token"
import store from "../redux/store"

if (typeof window !== "undefined" && window.localStorage.token) {
  setAuthToken(typeof window !== "undefined" && window.localStorage.token)
}
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
const makeStore = () => store
const wrapper = createWrapper(makeStore, { debug: false })
export default wrapper.withRedux(MyApp)
