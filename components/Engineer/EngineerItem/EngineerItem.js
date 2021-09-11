import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { Container, Grid, makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import { getEngineersMoreData } from "@redux/actions/engineer"
import InfiniteScroll from "react-infinite-scroll-component"
import ProfileSkillsItem from "@components/Engineer/EngineerProfile/ProfileSkillsItem/ProfileSkillsItem"
import { LOADING_MORE_DATA, LOADED_MORE_DATA } from "@redux/actions/types"

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
      maxWidth: 250,
      margin: 10
    },
    textCenter: {
      textAlign: "center",
      fontSize: "20px"
    },
    media: {
      height: 200
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
        loader={<h1 className={classes.textCenter}>Loading...</h1>}>
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
                      Expected Salary : {engineer.salary === null ||engineer.salary == "" ? "" : <span className="card-salary"> {engineer.salary} </span> } 
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
