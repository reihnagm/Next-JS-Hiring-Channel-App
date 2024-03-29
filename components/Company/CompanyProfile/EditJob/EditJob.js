import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { editPostJob, updatePostJob } from "@redux/actions/company"
import { getSkills } from "@redux/actions/skill"
import { getJobTypes } from "@redux/actions/jobtype"
import Spinner from "@components/Spinner/Spinner"
import EditJobItem from "@components/Company/CompanyProfile/EditJob/EditJobItem/EditJobItem"

const EditJob = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { postjob, loading } = useSelector(state => state.postjob)
  const { jobtypes } = useSelector(state => state.jobtype)
  const { skills } = useSelector(state => state.skill)
  useEffect(() => {
    if (router.asPath !== router.route) {
      dispatch(editPostJob(router.query.slug))
    }
    dispatch(getSkills())
    dispatch(getJobTypes())
  }, [router])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <EditJobItem postJob={postjob} updatePostJob={updatePostJob} allSkills={skills} allJobTypes={jobtypes} history={history} />
    </>
  )
}

export default EditJob
