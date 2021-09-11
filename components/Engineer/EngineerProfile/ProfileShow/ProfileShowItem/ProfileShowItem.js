import React from "react"
import { Container, Grid, Paper, Button, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertFromRaw } from 'draft-js'
import dynamic from "next/dynamic"
import * as moment from "moment"
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import CakeIcon from "@material-ui/icons/Cake"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import SlideshowIcon from "@material-ui/icons/Slideshow"
import AvatarComponent from "../../../../Avatar/Avatar"
const ProfileSkillsItem = dynamic(() => import("../../ProfileSkillsItem/ProfileSkillsItem"), {
  ssr: false
})

const ProfileShowItem = ({ engineer }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    }
  }))
  const classes = useStyles()
  const router = useRouter()
  const birthdate = typeof engineer.birthdate !== "undefined" && engineer.birthdate !== null ? moment(engineer.birthdate).format("D MMMM YYYY") : ""
  return (
    <>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <AvatarComponent imageSource={engineer.avatar} altName={engineer.name} type="engineers" width="80" height="80" spaceBottom="20" />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p>{engineer.fullname}</p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.email} </p>
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
                    <p className="leading-loose"> {engineer.location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.telephone} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <SlideshowIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {engineer.showcase} </p>
                  </Grid>
                </Grid>
                <Button type="button" variant="contained" color="primary" onClick={() => router.back()}>
                  Back
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                { engineer.description != "" ? 
                  <Editor
                    toolbarHidden={true}
                    readOnly={true}
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(engineer.description)))}
                  />
                  : ""
                }
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <p className="mb-2">
                  skills
                  <ProfileSkillsItem items={engineer.skills} />
                </p>
              </Paper>
              <div className="mt-6">
                <Paper className={classes.paper}>
                  <p className="mb-2">Expected Salary</p>
                  {engineer.salary === null ||engineer.salary == "" ? "" : <span className="card-salary"> {engineer.salary} </span> } 
                </Paper>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}
export default ProfileShowItem
