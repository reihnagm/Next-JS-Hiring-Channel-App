import React from "react"
import * as moment from "moment"
import dynamic from "next/dynamic"
import { Container, Grid, Paper, Button, Avatar, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SlideshowIcon from "@material-ui/icons/Slideshow"
const ProfileSkillsItem = dynamic(() => import("../ProfileSkillsItem/ProfileSkillsItem"), {
  ssr: false
})

const ProfileItem = ({ engineer }) => {
  const router = useRouter()
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      position: "relative"
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: "20px"
    }
  }))
  const classes = useStyles()
  const avatar = engineer.avatar === null ? "" : engineer.avatar 
  const fullname = engineer.fullname === null ? "" : engineer.fullname
  const email = engineer.email === null ? "" : engineer.email
  const birthdate = typeof engineer.birthdate !== "undefined" && engineer.birthdate !== null ? moment(engineer.birthdate).format("D MMMM YYYY") : ""
  const location = engineer.location === null ? "" : engineer.location
  const telephone = engineer.telephone === null ? "" : engineer.telephone
  const showcase = engineer.showcase === null ? "" : engineer.showcase
  const salary = engineer.salary === null ? "" : engineer.salary
  const description = engineer.description === null ? "" : engineer.description
  const skills = engineer.skills
  return (
    <div>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={`${process.env.NEXT_PUBLIC_IMAGES_ENGINEER}/${avatar}`} alt={fullname} />
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {fullname} </p>
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
                <Grid>
                  <Button type="button" variant="contained" color="primary" onClick={() => router.back()}>
                    Back
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p> {description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">
                  Skills
                  <ProfileSkillsItem items={skills} />
                </p>
              </Paper>
              <div className="mt-6">
                <Paper className={classes.paper}>
                  <p className="mb-2">Expected Salary</p>
                  <p>{salary}</p>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default ProfileItem
