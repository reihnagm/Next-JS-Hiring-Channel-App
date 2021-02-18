import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { AppBar, Toolbar, InputBase, IconButton, Menu, MenuItem, fade, makeStyles } from "@material-ui/core"
import { logout } from "../../redux/actions/auth"
import Link from "next/link"
import Image from "next/image"
import AvatarComponent from "../Avatar/Avatar"
import SearchIcon from "@material-ui/icons/Search"

const Header = ({ handleSearchEngineer, handleSearchCompany }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const logoutUser = () => {
    dispatch(logout())
    handleMenuClose()
  }
  const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    large: {
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  }))
  const userRole = user && user.role
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const menuId = "primary-search-account-menu"
  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const renderMenu = (
    <Menu keepMounted elevation={1} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} anchorEl={anchorEl} id={menuId} open={isMenuOpen} onClose={handleMenuClose}>
      {userRole === 1 && (
        <>
          <MenuItem className="text-black" onClick={() => router.push("/engineers/profile")}>
            Profile
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/engineers/profile/edit")}>
            Edit Profile
          </MenuItem>
        </>
      )}
      {userRole === 2 && (
        <>
          <MenuItem className="text-black" onClick={() => router.push("/companies/profile")}>
            Profile
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/companies/add-job")}>
            Add Job
          </MenuItem>
          <MenuItem className="text-black" href="/companies/profile/me/edit">
            Edit User Profile
          </MenuItem>
        </>
      )}
      <MenuItem onClick={logoutUser}>Logout</MenuItem>
    </Menu>
  )
  const authLinks = (
    <div className={classes.grow}>
      <AppBar elevation={1} color="transparent" position="static">
        <Toolbar>
          <div className={classes.grow}>
            <Image className="logo" src="/assets/images/logo/logo.png" alt="Hiring Channel Logo" width={80} height={80} />
          </div>
          {router.pathname === "/engineers" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search name here..."
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={ev => handleSearchEngineer(ev.target.value)}
              />
            </div>
          )}
          {router.pathname === "/companies" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search name here..."
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={ev => handleSearchCompany(ev.target.value)}
              />
            </div>
          )}
          <div className={classes.grow}>
            <span className="text-black mx-3 cursor-pointer" onClick={() => router.push("/")}>
              Home
            </span>
            <span className="text-black mx-3 cursor-pointer" onClick={() => router.push("/engineers")}>
              Engineers
            </span>
            <span className="text-black mx-3 cursor-pointer" onClick={() => router.push("/companies")}>
              Companies
            </span>
          </div>
          <div className={classes.grow}>
            <span className="mx-3 cursor-pointer" onClick={handleProfileMenuOpen}>
              Hello, {user.fullname}
            </span>
            <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit" aria-controls={menuId} onClick={handleProfileMenuOpen}>
              <AvatarComponent imageSource={user.avatar} altName={user.avatar} type={userRole === 1 ? "engineers" : "companies"} width="30" height="30" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
  const guestLinks = (
    <div className={classes.grow}>
      <AppBar elevation={1} color="transparent" position="static">
        <Toolbar>
          <div className={classes.grow}>
            <Image className="logo" src="/assets/images/logo/logo.png" alt="Hiring Channel Logo" width={80} height={80} />
          </div>
          {router.pathname === "/engineers" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search name here..."
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={ev => handleSearchEngineer(ev.target.value)}
              />
            </div>
          )}
          {router.pathname === "/companies" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search name or location here..."
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={ev => handleSearchCompany(ev.target.value)}
              />
            </div>
          )}
          <div className={classes.grow}>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("/")
              }}
            >
              Home
            </span>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("/engineers")
              }}
            >
              Engineers
            </span>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("/companies")
              }}
            >
              Companies
            </span>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("/login")
              }}
            >
              Login
            </span>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("/register")
              }}
            >
              Register
            </span>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
  return <>{isAuthenticated ? authLinks : guestLinks}</>
}
export default Header
