import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { Container, Grid, Button, TextField } from "@material-ui/core"
import { Toast } from "../../../../../utils/helper"

const UserProfileEditItem = ({ update }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    email: ""
  })

  useEffect(() => {
    setFormData({
      fullname: user && user.fullname === null ? "" : user.fullname,
      nickname: user && user.nickname === null ? "" : user.nickname,
      email: user && user.email === null ? "" : user.email
    })
  }, [])

  const { fullname, nickname, email } = formData

  const onChange = ev => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value })
  }

  const onSubmit = async ev => {
    ev.preventDefault()
    try {
      let fd = new FormData()
      fd.set("userUid", user.uid)
      fd.set("userFullName", fullname)
      fd.set("userNickname", nickname)
      dispatch(update(fd, router))
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.message
      })
    }
  }
  return (
    <>
      <Container fixed>
        <Grid container className="my-5" direction="row" justify="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={onSubmit}>
              <TextField onChange={onChange} value={fullname ?? ""} name="fullname" margin="normal" variant="outlined" label="Full Name" fullWidth />
              <TextField onChange={onChange} value={nickname ?? ""} name="nickname" margin="normal" variant="outlined" label="Nick Name" fullWidth />
              <TextField onChange={onChange} value={email ?? ""} name="email" margin="normal" variant="outlined" label="Email" fullWidth disabled />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" onClick={() => router.back()}>
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserProfileEditItem
