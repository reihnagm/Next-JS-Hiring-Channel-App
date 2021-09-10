import React, { useState } from "react"
import Head from "next/head"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import { Button, IconButton, InputAdornment, InputLabel, Grid, Avatar, Badge, FormControl, makeStyles, TextField, MenuItem, Select, Typography } from "@material-ui/core"
import { registerEngineer, registerCompany } from "@redux/actions/auth"
import { isImage, bytesToSize, validateEmail, Toast } from "@utils/helper"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined"
import MaskedInput from "react-text-mask"
import "react-dropdown/style.css"

const renderFunction = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
  <div>
    <TextField {...getInputProps()} margin="normal" variant="outlined" label="* Company Location" fullWidth />
    <div className="autocomplete-dropdown-container">
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active ? "suggestion-item--active" : "suggestion-item"
        const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" }
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style
            })}
            key={i}
          >
            <span
              style={{
                backgroundColor: "#ea80fc",
                display: "inline-block",
                height: "200",
                padding: "8px",
                color: "white"
              }}
            >
              {suggestion.description}
            </span>
          </div>
        )
      })}
    </div>
  </div>
)
const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const [role, setRole] = useState(1)
  const onChangeRole = element => {
    setRole(element.target.value)
  }
  
  if (isAuthenticated) {
    router.push("/")
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    chip: {
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    },
    formRegister: {
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
  
  const EngineerInput = () => {
    const [formData, setFormData] = useState({
      fullname: "",
      nickname: "",
      email: "",
      password: ""
    })
    const { fullname, nickname, email, password } = formData
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const onChange = ev => setFormData({ ...formData, [ev.target.name]: ev.target.value })
    const onSubmit = async ev => {
      ev.preventDefault()
      try {
        if (fullname.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Fullname Required"
          })
          return 
        }
        if (nickname.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Nickname Required"
          })
          return 
        }
        if (email.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "E-mail Address Required"
          })
          return 
        }
        if (validateEmail(email)) {
          Toast.fire({
            icon: "error",
            title: "Invalid Email. e.g : johndoe@gmail.com"
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
        if (password.length < 6) {
          Toast.fire({
            icon: "error",
            title: "Password Minimum 6 Character"
          })
          return 
        }
        if (typeof role === "undefined") {
          Toast.fire({
            icon: "error",
            title: "Role Required"
          })
          return
        }
        dispatch(registerEngineer(fullname, nickname, email, password, role, router))
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message
        })
      }
    }
    return (
      <form className={classes.formRegister} onSubmit={onSubmit}>
        <TextField onChange={onChange} value={fullname} name="fullname" margin="normal" variant="outlined" label="Fullname" fullWidth />
        <TextField onChange={onChange} value={nickname} name="nickname" margin="normal" variant="outlined" label="Nickname" fullWidth />
        <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="Email" fullWidth />
        <TextField  onChange={onChange} value={password} name="password" margin="normal" type={showPassword ? "text": "password"} variant="outlined" label="Password" fullWidth 
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
          Register
        </Button>
        <Button type="button" variant="contained" color="primary" onClick={() => router.replace("/")}>
          Back
        </Button>
      </form>
    )
  }
  const CompanyInput = () => {
    let fileRef
    const [formData, setFormData] = useState({
      fullname: "",
      nickname: "",
      companyname: "",
      companyemail: "",
      companytelp: "",
      companydesc: "",
      email: "",
      password: ""
    })
    const [logoFile, setLogoFile] = useState("")
    const [logoDefault, setDefaultLogo] = useState("")
    const [companylocation, setCompanyLocation] = useState("")
    const handleFile = _ => {
      fileRef.click()
    }
    const handleAvatar = async ev => {
      if (ev.target.files && ev.target.files[0]) {
        let size = bytesToSize(ev.target.files[0].size)
        let extension = ev.target.files[0].name.split(".").pop()
        let reader = new FileReader()
        try {
          if (size > process.env.NEXT_PUBLIC_SIZE_IMAGE) {
            throw new Error("File size cannot larger than 1MB")
          }
          if (!isImage(extension)) {
            throw new Error("File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP")
          }
          setLogoFile(ev.target.files[0])
          reader.onload = e => {
            setDefaultLogo(e.target.result)
          }
          reader.onprogress = e => {
            const percent = (e.loaded / e.total) * 100
          }
          reader.readAsDataURL(ev.target.files[0])
        } catch (e) {
          Toast.fire({
            icon: "error",
            title: e.message
          })
        }
      }
    }
    const onChangeLocation = address => {
      setCompanyLocation(address)
    }
    const handleSelectLocation = async address => {
      try {
        const results = await geocodeByAddress(address)
        setCompanyLocation(results[0].formatted_address)
      } catch (err) {
        console.log(err)
      }
    }
    const { fullname, nickname, companyname, companyemail, companytelp, companydesc, email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
      e.preventDefault()
      try {
        if (fullname.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Fullname Required"
          })
          return
        }
        if (nickname.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Nickname Required"
          })
          return
        }
        if (email.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "E-mail Address Required"
          })
          return
        }
        if (validateEmail(email)) {
          Toast.fire({
            icon: "error",
            titile: "Invalid E-mail Address. E.G : johndoe@gmail.com"
          })
          return
        }
        if (logoFile === "") {
          Toast.fire({
            icon: "error",
            title: "Logo required"
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
        if (password.length < 6) {
          Toast.fire({
            icon: "error",
            title: "Password Minimum 6 Character" 
          })
          return
        }
        if (companyname.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Company Name Required"
          })
          return
        }
        if (companyemail.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Company E-mail Address Required"
          })
          return 
        }
        if (companydesc.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Company Description Required"
          })
          return
        }
        if (companytelp.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Company Telephone Required"
          })
          return
        }
        if (companylocation.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "Company Location Required"
          })
          return
        }
        if (typeof role === "undefined") {
          Toast.fire({
            icon:  "error",
            title: "Role Required"
          })
          return
        }
        let fd = new FormData()
        fd.set("fullname", fullname)
        fd.set("nickname", nickname)
        fd.set("email", email)
        fd.set("password", password)
        fd.set("logo", logoFile)
        fd.set("role", role)
        fd.set("companyname", companyname)
        fd.set("companyemail", companyemail)
        fd.set("companytelp", companytelp)
        fd.set("companydesc", companydesc)
        fd.set("companylocation", companylocation)
        registerCompany(fd, history)
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message
        })
      }
    }
    return (
      <form className={classes.formRegister} onSubmit={event => onSubmit(event)}>
        <TextField onChange={onChange} value={fullname} name="fullname" margin="normal" variant="outlined" label="User Fullname" fullWidth />
        <TextField onChange={onChange} value={nickname} name="nickname" margin="normal" variant="outlined" label="User Nickname" fullWidth />
        <TextField onChange={onChange} value={email} name="email" margin="normal" variant="outlined" label="User Email" fullWidth />
        <Grid container className="my-5" direction="column" justify="center" alignItems="center">
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            badgeContent={
              <Grid
                item
                className="p-1 rounded"
                style={{
                  backgroundColor: "#ea80fc"
                }}
              >
                <CreateOutlinedIcon
                  onClick={handleFile}
                  className="text-white"
                  style={{
                    cursor: "pointer"
                  }}
                />
                <input ref={input => (fileRef = input)} onChange={handleAvatar} style={{ display: "none" }} type="file" />
              </Grid>
            }
          >
            <Avatar className={classes.large} alt={fullname} src={`${logoDefault}`} />
          </Badge>
        </Grid>
        <TextField onChange={onChange} value={companyname} name="companyname" margin="normal" variant="outlined" label="* Company Name" fullWidth />
        <TextField onChange={onChange} value={companyemail} name="companyemail" margin="normal" variant="outlined" label="* Company Email" fullWidth />
        <MaskedInput mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} placeholderChar={"_"} onChange={e => onChange(e)} render={(ref, props) => <TextField value={companytelp} name="companytelp" margin="normal" variant="outlined" label="* Company Telp" fullWidth inputRef={ref} {...props} />} />
        <TextField onChange={onChange} value={companydesc} multiline rows="4" name="companydesc" margin="normal" variant="outlined" label="* Company Description" fullWidth />
        <PlacesAutocomplete onChange={onChangeLocation} value={companylocation} onSelect={handleSelectLocation}>
          {renderFunction}
        </PlacesAutocomplete>
        <TextField onChange={onChange} value={password} name="password" margin="normal" variant="outlined" label="Password" type="password" fullWidth />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        <Button type="button" variant="contained" color="primary" onClick={() => router.replace("/")}>
          Back
        </Button>
      </form>
    )
  }
  return (
    <>
      <Head>
        <meta name="description" content="Hiring Channel Register Page" />
        <title>Register</title>
      </Head>
      <div id="register" className="columns justify-center min-h-screen">
        <div className="column marginless" id="cover-background-register">
          <div id="cover-register"></div>
          <div id="content-register"> 
            <h2 className="title mx-3 text-white">Hire expert freelancers for any job, online</h2>
            <h3 className="sub-title mx-3 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
          </div>
        </div>
        <div className="column">
          <Typography className={classes.formTitle} variant="h5" component="h5" gutterBottom>
            Register
          </Typography>
          <div className={classes.formRegister}>
            <FormControl margin="normal" variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-role">Select your Role</InputLabel>
              <Select
                inputProps={{
                  name: "role",
                  id: "outlined-role"
                }}
                value={role}
                label="Select your Role"
                onChange={e => onChangeRole(e)}
              >
                <MenuItem value={1}>Engineer</MenuItem>
                <MenuItem value={2}>Company</MenuItem>
              </Select>
            </FormControl>
          </div>
          {role == 1 && <EngineerInput />}
          {role == 2 && <CompanyInput />}
        </div>
      </div>
    </>
  )
}

export default Register
