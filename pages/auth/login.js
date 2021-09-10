import React, { useState } from "react"
import Head from "next/head"
import { Button, InputAdornment, IconButton, TextField, Typography, makeStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { login } from "@redux/actions/auth"
import { validateEmail, Toast } from "@utils/helper"
import { useRouter } from "next/router"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const useStyles = makeStyles(theme => ({
    formLogin: {
      [theme.breakpoints.down("md")]: {
        margin: "0 30px"
      }
    },
    formTitle: {
      [theme.breakpoints.down("md")]: {
        margin: "10px 0",
        textAlign: "center",
      }
    }
  }))
  const classes = useStyles()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { email, password } = formData
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onChange = ev => setFormData({ ...formData, [ev.target.name]: ev.target.value })
  const onSubmit = (ev) => {
    ev.preventDefault()
    try {
      if (email.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "E-mail Address Required"
        })
        return
      }
      if (password.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "Password Required"
        })
        return
      }
      if (validateEmail(email)) {
        Toast.fire({
          icon: "error",
          title: "Invalid E-mail Address e.g (johndoe@gmail.com)"
        })
        return
      }
      if (password.length < 6) {
        Toast.fire({
          icon: "error",
          title: "Password Minimum 6 Character"
        })
        return 
      }
      dispatch(login(email, password, router))
    } catch (e) {
      Toast.fire({
        icon: "error",
        title: e.message
      })
    }
  }

  if (isAuthenticated) {
    router.push("/")
  }

  return (
    <>
      <Head>
        <meta name="description" content="Hiring Channel Login Page" />
        <title>Login</title>
      </Head>
      <div id="login" className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-login">
          <div id="cover-login"></div>
          <div id="content-login">
            <h2 className="title mx-2 text-white">Hire expert freelancers for any job, online</h2>
            <h3 className="sub-title mx-2 text-white">Millions of small businesses use Freelancer to turn their ideas into reality.</h3>
          </div>
        </div>
        <div className="column">
          <Typography className={classes.formTitle} variant="h5" component="h5" gutterBottom>
            Login
          </Typography>
          <form className={classes.formLogin} onSubmit={onSubmit}>
            <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
            <TextField onChange={onChange} value={password} name="password" margin="normal" type={showPassword ? "text": "password"} variant="outlined" label="Password" fullWidth 
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Button type="button" variant="contained" color="primary" onClick={() => router.replace("/")}>
              Back
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
