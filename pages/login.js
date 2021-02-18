import React, { useState, useEffect } from "react"
import Head from "next/head"
import { Button, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/actions/auth"
import { validateEmail, Toast } from "../utils/helper"
import { useRouter } from "next/router"

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { isAuthenticated } = useSelector(state => state.auth)
  const { email, password } = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = (ev) => {
    ev.preventDefault()
    try {
      if (email.trim() === "") {
        throw new Error("Email Required")
      }
      if (password.trim() === "") {
        throw new Error("Password Required")
      }
      if (validateEmail(email)) {
        throw new Error("Invalid Email. e.g (johndoe@gmail.com)")
      }
      if (password.length < 6) {
        throw new Error("Password Minimum 6 Character")
      }
      dispatch(login(email, password, router))
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.message
      })
    }
  }
  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/")
    }
  }, [isAuthenticated])

  return (
    <>
      <Head>
        <meta name="description" content="Hiring Channel Login Page" />
        <title>Login</title>
      </Head>
      <div className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-login">
          <div id="cover-login"></div>
          <h2 className="title mx-2 text-white">Hire expert freelancers for any job, online</h2>
          <h3 className="sub-title mx-2 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
        </div>
        <div className="column">
          <Typography variant="h5" component="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
            <TextField onChange={onChange} value={password} name="password" type="password" margin="normal" variant="outlined" label="Password" fullWidth />
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </div>
            <div className="margin-normal">
              <Button style={{ margin: 0 }} type="button" variant="contained" color="primary" onClick={() => router.replace("/")} fullWidth>
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
