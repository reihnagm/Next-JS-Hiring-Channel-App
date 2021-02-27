import React, { useEffect, useState } from "react"
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, makeStyles } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { getCompaniesMoreData } from "../../../redux/actions/company"
import dynamic from "next/dynamic"
import ReactHtmlParser from "react-html-parser"
import InfiniteScroll from "react-infinite-scroll-component"
const ProfileSkillsItem = dynamic(() => import("../CompanyProfile/ProfileSkillsItem/ProfileSkillsItem"), {
  ssr: false
})

const CompanyItem = ({ companies }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loadingMoreDataC, searchC, showC, sortC, filterByC } = useSelector(state => state.company)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    async function fetchData () {
      dispatch(await getCompaniesMoreData(searchC, showC, sortC, filterByC, offset))
    }
    if (offset > 0) {
      fetchData()
    }
  }, [searchC, showC, sortC, filterByC, offset])
  const useStyles = makeStyles({
    root: {
      maxWidth: 280,
      margin: 10
    },
    media: {
      height: 200
    }
  })
  const classes = useStyles()
  return (
    <Container fixed>
      <InfiniteScroll dataLength={companies.length} next={() => setOffset(offset + 10)} hasMore={true} loading={loadingMoreDataC}>
        <Grid container direction="row" justify="start" alignItems="center">
          {companies.map(company => (
            <Card className={classes.root}>
              <CardActionArea onClick={() => router.replace(`/companies/profile?job-title=${company.slug}`, `/companies/profile?job-title=${company.slug}`)}>
                <CardMedia className={classes.media} image={`${process.env.NEXT_PUBLIC_IMAGES_COMPANY}/${company.logo}`} title={company.logo} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <span className="card-salary"> {company.salary} </span>
                  </Typography>
                  <div className="my-3">
                    <div className="my-3">
                      <Typography variant="body2" color="textSecondary" component="p">
                        Job description & requirements
                      </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <div style={{ height: "45px", overflow: "hidden" }}>{ReactHtmlParser(company.content)}</div>
                    </Typography>
                  </div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Requirements : <ProfileSkillsItem items={company.skills} />
                  </Typography>
                  <div className="mt-3">
                    <Typography variant="body2" color="textSecondary" component="p">
                      Job Type : {company.jobtypes}
                    </Typography>
                  </div>
                  <div className="mt-3">
                    <Typography variant="body2" color="textSecondary" component="p">
                      Vacancies : {company.vacancies}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}
export default CompanyItem
