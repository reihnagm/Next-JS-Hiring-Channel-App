import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { Container, Grid, makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import { getEngineersMoreData } from "@redux/actions/engineer"
import InfiniteScroll from "react-infinite-scroll-component"
import ProfileSkillsItem from "@components/Engineer/EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"

const EngineerItem = ({ engineers }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loadingMoreData, searchN, showN, sortN, filterByN } = useSelector(state => state.engineer)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function fetchData() {
      dispatch(getEngineersMoreData(searchN, showN, sortN, filterByN, offset))
    }
    if (offset > 0) {
      fetchData()
    }
  }, [searchN, showN, sortN, filterByN, offset])

  const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin: 10
    },
    media: {
      height: 200
    }
  })
  const classes = useStyles()
  return (
    <Container fixed>
      <InfiniteScroll dataLength={engineers.length} next={() => setOffset(offset + 10)} hasMore={true} loading={loadingMoreData}>
        <Grid container direction="row" justify="start" alignItems="center">
          {engineers.map((engineer, i) => {
            return (
              <Card key={i} className={classes.root}>
                <CardActionArea onClick={() => router.push(`/engineers/profile?slug=${engineer.slug}`)}>
                  <CardMedia className={classes.media} image={`${process.env.NEXT_PUBLIC_IMAGES_ENGINEER}/${engineer.avatar}`} title={engineer.slug} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {engineer.fullname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Expected Salary : {engineer.salary === null ? "" : <span className="card-salary"> {engineer.salary} </span> } 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Skills :
                      <ProfileSkillsItem items={engineer.skills} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}

export default EngineerItem
