import { createTheme } from "@material-ui/core"
import purple from "@material-ui/core/colors/purple"
import grey from "@material-ui/core/colors/grey"
const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        margin: "10px"
      }
    },
    MuiPaper: {
      elevation1: {
        "box-shadow": "0px 1px 1px 1px rgba(0,0,0,0.15)"
      }
    }
  },
  palette: {
    primary: {
      main: purple["A100"],
      contrastText: "#ffffff"
    },
    secondary: {
      main: purple["A400"],
      contrastText: "#ffffff"
    },
    common: {
      white: grey["400"]
    },
    contrastThreshold: 4,
    tonalOffset: 0.3
  }
})
export default theme
