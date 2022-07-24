import React, { useState } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { AppBar, SwipeableDrawer, Toolbar, InputBase, IconButton, Menu, MenuItem, alpha, makeStyles } from "@material-ui/core"
import { logout } from "@redux/actions/auth"
import Image from "next/image"
import AvatarComponent from "@components/Avatar/Avatar"
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from "@material-ui/icons/Search"
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
    list: {
      width: 250,
    },
    menu: {
      display: "block",
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    hamburgerMenu: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      width: "auto",
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
  const classes = useStyles()
  const [drawer, setDrawer] = useState({
    left: false
  });
  const [anchorEl, setAnchorEl] = useState(null)
  const menuId = "primary-search-account-menu"
  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer, [anchor]: open });
  };
  const renderMenu = (
    <Menu 
      keepMounted 
      elevation={1} anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      transformOrigin={{ vertical: "top", horizontal: "right" }} 
      anchorEl={anchorEl} 
      id={menuId} 
      open={isMenuOpen} 
      onClose={handleMenuClose}>
      {user.role === 1 && (
        <>
          <MenuItem className="text-black" onClick={() => router.push("/engineers/profile")}>
            Profile
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/engineers/portfolio/add")}>
            Add Portfolio
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/engineers/profile/edit")}>
            Edit Profile
          </MenuItem>
        </>
      )}
      {user.role === 2 && (
        <>
          <MenuItem className="text-black" onClick={() => router.push("/companies/profile")}>
            Profile
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/companies/add-job")}>
            Add Job
          </MenuItem>          
          <MenuItem className="text-black" onClick={() => router.push("/companies/profile/user/edit")}>
            Edit User Profile
          </MenuItem>
          <MenuItem className="text-black" onClick={() => router.push("/companies/profile/edit")}>
            Edit Company Profile
          </MenuItem>
        </>
      )}
      <MenuItem onClick={logoutUser}>Logout</MenuItem>
    </Menu>
  )
  const authLinks = (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <div className={classes.grow}>
            <a href="/"><Image className="logo" src="/assets/images/logo/logo.png" alt="Hiring Channel Logo" width={80} height={80} /></a>
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
          <div className={classes.menu}>
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
              <AvatarComponent imageSource={user.avatar} altName={user.avatar} type={user.role === 1 ? "engineers" : "companies"} width="30" height="30" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
  const guestLinks = (
    <div>
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
          <IconButton 
            className={classes.hamburgerMenu} 
            onClick={toggleDrawer('left', true)} 
            edge="start" 
            color="inherit" 
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'} 
            open={drawer['left']} 
            onClose={toggleDrawer('left', false)}
          >
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer('left', false)}
              onKeyDown={toggleDrawer('left', false)}
            >
              <List>
                {[  
                  {
                    title: "Home",
                    url: "/"
                  }, 
                  {
                    title: "Engineers",
                    url: "/engineers"
                  },
                  {
                    title: "Companies",
                    url: "/companies"
                  }, 
                  {
                    title: "Login",
                    url: "/auth/login"
                  },
                  {
                    title: "Register",
                    url: "auth/register"
                }].map((item, i) => (
                  <ListItem button key={i}>
                    <ListItemText 
                      onClick={() => {
                        router.push(item.url)
                      }} 
                      primary={item.title} 
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          </SwipeableDrawer>
          <div className={classes.menu}>
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
                router.push({
                  pathname: '/engineers',
                  query: {
                    show: 10,
                    sort: 'newer',
                    filterBy: 'latest-update'
                  },
                })
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
                router.push("/auth/login")
              }}
            >
              Login
            </span>
            <span
              className="text-black mx-3 cursor-pointer"
              onClick={() => {
                router.push("auth/register")
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
