import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { Container, Grid, makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import { getEngineersMoreData } from "@redux/actions/engineer"
import Spinner from "@components/Spinner/Spinner"
import { LOADING_MORE_DATA, LOADED_MORE_DATA } from "@redux/actions/types"
import InfiniteScroll from "react-infinite-scroll-component"
import dynamic from "next/dynamic"
const ProfileSkillsItem = dynamic(() => import("@components/Engineer/EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"), {
  ssr: false
})
const EngineerItem = ({ engineers }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loadingMoreData, engineersCount, searchN, showN, sortN, filterByN } = useSelector(state => state.engineer)
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
    const fetchData = () => { 
      setTimeout(() => {  
        dispatch(getEngineersMoreData(searchN, showN, sortN, filterByN, offset))
      }, 1500) 
    }
    if(offset > 0) {
      fetchData()
    }
  }, [searchN, showN, sortN, filterByN, offset])

  const fetchMoreData = () => {
    setOffset(10)
  }

  const useStyles = makeStyles({
    root: {
      maxWidth: 280,
      margin: 10
    },
    textCenter: {
      textAlign: "center",
      fontWeight: "normal",
      fontSize: "20px"
    },
    media: {
      height: 180
    }
  })
  const classes = useStyles()
  return (
    <Container fixed>
      <InfiniteScroll 
        dataLength={engineers.length} 
        next={fetchMoreData} 
        onScroll={() => {
          if(engineers.length == engineersCount)
            dispatch({
              type: LOADING_MORE_DATA
            })  
          else
            dispatch({
              type: LOADED_MORE_DATA
            }) 
        }}
        hasMore={loadingMoreData} 
        loader={
          <div className="flex justify-c-center">
            <div className="spinner spinner-loader">
              <span className="spinner-item-loader"></span>
              <span className="spinner-item-loader"></span>
              <span className="spinner-item-loader"></span>
            </div>
          </div>
        }>
        <Grid container direction="row" justify="start" alignItems="center">
          {engineers.map((engineer, i) => {
            return (
              <Card key={i} className={classes.root}>
                <CardActionArea onClick={() => router.push(`/engineers/profile?slug=${engineer.slug}`)}>
                  <CardMedia className={classes.media} image={`${process.env.NEXT_PUBLIC_IMAGES_ENGINEER}/${engineer.avatar}`} title={engineer.slug} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                      {engineer.fullname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {engineer.salary === null ||engineer.salary == "" ? "" : <span>
                      Expected Salary : <span className="card-salary">{engineer.salary}</span>
                    </span> } 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
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
