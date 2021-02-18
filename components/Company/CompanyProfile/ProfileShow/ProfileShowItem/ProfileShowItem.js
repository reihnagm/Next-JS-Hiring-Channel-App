import React from "react"
import { Container, Grid, Paper, Button, makeStyles, Avatar } from "@material-ui/core"
import { useRouter } from "next/router"
import { auth } from "../../../../../utils/helper"
import ReactHtmlParser from "react-html-parser"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import ProfileSkillsItem from "../../ProfileSkillsItem/ProfileSkillsItem"

const ProfileDetailItem = ({ company }) => {
  const router = useRouter()
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: "20px"
    }
  }))
  const classes = useStyles()
  return (
    <div>
      <div className="backdrop-top"></div>
      <Container className="mt-64" fixed>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar} src={`${process.env.NEXT_PUBLIC_IMAGES_COMPANY}/${company.logo}`} alt={company.name} />
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <AccountBalanceIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p>{company.name}</p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {company.email} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p className="leading-loose"> {company.location} </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={2}>
                    <PhoneIcon />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <p> {company.telephone} </p>
                  </Grid>
                </Grid>
                <Button type="button" variant="contained" color="primary" onClick={() => router.back()}>
                  Back
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <h1 className="text-title mb-3">About Company</h1>
                <p> {company.description} </p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.paper}>
                <div id="tinymce-rendered-html">
                  <Grid container>
                    <Grid item md={9} xs={12}>
                      <h2 className="mb-3">{company.title}</h2>
                    </Grid>
                    {company.userUid === auth().uid && (
                      <Grid item md={3} xs={12}>
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            router.push({
                              pathname: `/companies/jobs/${company.slug}/edit`,
                              
                              query: { slug: company.slug }
                            })
                          }
                        >
                          Edit
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <h2 className="my-3">Job description & requirements</h2>
                  {ReactHtmlParser(company.content)}
                </div>
              </Paper>
              <Paper className={`${classes.paper} mt-4`}>
                <p>
                  Requirements :
                  <ProfileSkillsItem items={company.skills} />
                </p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default ProfileDetailItem
