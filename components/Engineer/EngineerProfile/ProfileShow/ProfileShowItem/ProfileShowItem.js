import React, { useState } from "react"
import { Container, Grid, Paper, Button, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import { autoPlay } from "react-swipeable-views-utils"
import SwipeableViews from "react-swipeable-views"
import Output from "editorjs-react-renderer"
import dynamic from "next/dynamic"
import * as moment from "moment"
import Dots from "material-ui-dots"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SlideshowIcon from "@material-ui/icons/Slideshow"
import AvatarComponent from "@components/Avatar/Avatar"
import "react-image-gallery/styles/css/image-gallery.css";
const ProfileSkillsItem = dynamic(() => import("@components/Engineer/EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"), {
  ssr: false
})

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const ProfileShowItem = ({ engineer }) => {
  const useStyles = makeStyles(theme => ({
    dots: {
      height: 56,
      '& .MuiPaper-rounded': {
        background: 'rgb(200, 115, 242) 0%'
      },
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    }
  }))
  const classes = useStyles()
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const avatar = engineer.avatar === null || engineer.avatar === "" ? "" : engineer.avatar 
  const fullname = engineer.fullname === null || engineer.fullname === "" ? "" : engineer.fullname
  const jobTitle = engineer.job_title === null || engineer.job_title === "" ? "" : engineer.job_title
  const email = engineer.email === null || engineer.email === "" ? "" : engineer.email
  const birthdate = typeof engineer.birthdate !== "undefined" && engineer.birthdate !== null ? moment(engineer.birthdate).format("D MMMM YYYY") : ""
  const location = engineer.location === null || engineer.location === "" ? "" : engineer.location
  const telephone = engineer.telephone === null || engineer.telephone === "" ? "" : engineer.telephone
  const showcase = engineer.showcase === null || engineer.showcase === "" ? "" : engineer.showcase
  const salary = engineer.salary === null || engineer.salary === "" ? "" : engineer.salary
  // const description = engineer.description === null || engineer.description === "" ? "" : EditorState.createWithContent(convertFromRaw(JSON.parse(engineer.description)))
  const description = engineer.description === null || engineer.description === "" ? "" : JSON.parse(engineer.description)
  const skills = engineer.skills

  const styles = {  
    slide: {
      padding: 15,
      height: "100%",
      width: "100%",
      color: '#fff',
    },
    slide1: {
      background: '#FEA900',
    },
    slide2: {
      background: '#B3DC4A',
    },
    slide3: {
      background: '#6AC0FF',
    },
  };
  
  const onChangeIndex = (i) => {
    setIndex(i)
  }

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];


  return (
    <>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item md={4} xs={2} >
                    <AvatarComponent imageSource={avatar} altName={fullname} type="engineers" width="80" height="80" spaceBottom="20" />
                  </Grid>
                  <Grid className="d-flex align-s-center" item md={8} xs={10}>
                    <p> {jobTitle} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p>{fullname}</p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <CakeIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {birthdate} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {telephone} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <SlideshowIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {showcase} </p>
                  </Grid>
                </Grid>
                <Button type="button" variant="contained" color="primary" onClick={() => router.back()}>
                  Back
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12} >
              <Paper className={classes.paper}>
                <Output data={description} /> 
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">
                  <ProfileSkillsItem items={skills} />
                </p>
              </Paper>
              <div className="mt-4">
                <Paper className={classes.paper}>
                  <p className="mb-2">Expected Salary</p>
                  {salary === null || salary == "" ? "" : <span className="card-salary"> {salary} </span> } 
                </Paper>
              </div>
              <div className="mt-4">
                <Paper classes={classes.paper}>
                  <AutoPlaySwipeableViews enableMouseEvents interval={4000} index={index} onChangeIndex={onChangeIndex}>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                      <h2>My Project 1</h2>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>
                      <h2>My Project 2</h2>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide3)}>
                      <h2>My Project 3</h2>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                  </AutoPlaySwipeableViews>
                  <div style={{
                    display: "flex",
                    justifyContent: "center"
                  }}> 
                    <Dots
                      className={classes.dots}
                      count={3}
                      index={index}                    
                      onDotClick={(i) => setIndex(i)}
                    />
                  </div>
                </Paper>
              </div>
              {/* <div className="mt-4">
                <Paper classes={classes.paper}>
                  
                  <ImageGallery
                    autoPlay
                    slideDuration={450}
                    slideInterval={2000}
                    showPlayButton={false}
                    items={images} />
                </Paper>
              </div> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}
export default ProfileShowItem
