import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileCompany, storeAddJob } from "@redux/actions/company"
import { getSkills } from "@redux/actions/skill"
import { getJobTypes } from "@redux/actions/jobtype"
import Spinner from "@components/Spinner/Spinner"
import AddJobItem from "@components/Company/CompanyProfile/AddJob/AddJobItem/AddJobItem"

const AddJob = () => {
  const dispatch = useDispatch()
  const { company, loading } = useSelector(state => state.company)
  const { skills } = useSelector(state => state.skills)
  const { jobtypes } = useSelector(state => state.jobtype)
  useEffect(() => {
    async function fetchData() {
      dispatch(await getCurrentProfileCompany())
      dispatch(await getSkills())
      dispatch(await getJobTypes())
    }
    fetchData()
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <AddJobItem company={company} storeAddJob={storeAddJob} allSkills={skills} allJobTypes={jobtypes} />
    </>
  )
}

export default AddJob
